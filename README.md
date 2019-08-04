# Github Time Travel

## Description
This is a simple Chrome extension that allows you to easily traverse the history of a file within Github. To do so, this extension uses the Github API to fetch the next and previous commits when you're viewing a file and adds small little `<` and `>` buttons to a files options on Github. Clicking on these buttons, will go to the previous or next commit of the file.

![Example](https://raw.githubusercontent.com/barakyo/gh-time-travel/master/docs/images/github-time-travel-example.png)

## Contributing

### Requirements

* NodeJS v12.5.0
* NPM
* Chrome

### Development

1. Clone the repo
2. `$ npm install`
3. `$ npm run dev`

#### Enabling Chrome Extension

To be able to enable the extension for development, you'll have to setup the extension with Chrome.

1. Goto `chrome://extensions/`
2. Enable Developer Mode (top right)
3. Select "Load unpacked"
4. Browse to extension directory
