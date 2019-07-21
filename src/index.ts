import Octokit from '@octokit/rest';
console.log('Github Time Travel');

const BLOB = "blob";
const DEFAULT_LINK_CLASSES = "btn btn-sm BtnGroup-item";

interface OctokitCommit {
    author: any;
    comments_url: string;
    commit: any;
    comitter: any;
    html_url: string;
    node_id: string;
    parents: any[];
    sha: string;
    url: string;
}

class GithubFilePage {
    url: string;
    sha: string;
    org: string;
    repo: string;
    filepath: string;
    octokit: any;
    commits: string[];

    constructor(url: string, octokit: any = Octokit) {
        this.url = url;
        const pathTokens = this.url.split('/');
        // This should generate something like:
        /// ["", "Revmaker", "gremlex", "blob", "ed291c4664b6f308fd2fba8c114d10d50ce91bde", "lib", "gremlex", "application.ex"]
        this.org = pathTokens[1];
        this.repo = pathTokens[2];
        this.sha = pathTokens[4];
        this.filepath = pathTokens.slice(5).join("/");
        this.octokit = new octokit();
        this.commits = [];
    }

    private async fetchCommits() {
        const commits = await this.octokit.repos.listCommits({
            owner: this.org,
            repo: this.repo,
            path: this.filepath,
        })
        this.commits = commits.data.map((commit: OctokitCommit) => commit.sha)
    }

    private createCommitHref(commitSha: string): string {
        return `https://github.com/${this.org}/${this.repo}/${BLOB}/${commitSha}/${this.filepath}`;
    }

    private createLink(commitSha: string, text: string, className: string = DEFAULT_LINK_CLASSES): Element {
        const link = document.createElement('a');
        link.href = this.createCommitHref(commitSha);
        link.className = className;
        link.text = text;
        return link;
    }

    async getPreviousLink(): Promise<Element> {
        if (this.commits.length === 0) {
            await this.fetchCommits();
        }
        if (this.commits.length === 1) {
            return null;
        }
        let currentShaIndex = this.commits.findIndex(commit => commit === this.sha);
        if (currentShaIndex <= 0) {
            // Assume that sha is a branch so use first commit
            currentShaIndex = 0;
        }
        return this.createLink(this.commits[currentShaIndex + 1], '<');
    }

    async getNextLink(): Promise<Element> {
        if (this.commits.length === 0) {
            await this.fetchCommits();
        }
        if (this.commits.length === 1) {
            return null;
        }
        let currentShaIndex = this.commits.findIndex(commit => commit === this.sha);
        if (currentShaIndex <= 0) {
            // Assume that sha is a branch so use first commit
            currentShaIndex = 0;
        }
        if (currentShaIndex - 1 < 0) {
            return null;
        }
        return this.createLink(this.commits[currentShaIndex - 1], '>');
    }
}


async function main() {
    const btnGroups = document.querySelectorAll('.Box.mt-3 > .Box-header > .d-flex > .BtnGroup')
    const ghFilePage = new GithubFilePage(window.location.pathname);
    if (btnGroups.length > 0) {
        const btnGroup = btnGroups[0];
        const prevLink = await ghFilePage.getPreviousLink();
        const nextLink = await ghFilePage.getNextLink();
        if (prevLink) {
            btnGroup.insertBefore(prevLink, btnGroup.children[0]);
        }
        if (nextLink) {
            btnGroup.appendChild(nextLink);
        }
    }
}

main();
