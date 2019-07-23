function onSubmit(event) {
  const patNode = document.getElementById("personalAccessToken");
  chrome.storage.sync.set({ personalAccessToken: patNode.value });
  const optionsForm = document.getElementById("optionsForm");
  console.log(optionsForm.classList);
  optionsForm.className = "hide";
  const saved = document.getElementById("saved");
  const classes = [...saved.classList];
  saved.classList = `${classes.slice(0, classes.length - 1).join(" ")} show`;
}

const saveButton = document.getElementById("save-btn");
saveButton.onclick = onSubmit;
