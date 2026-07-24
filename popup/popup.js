const statusEl = document.getElementById("popupStatus");
const openApp = document.getElementById("openApp");
const openX = document.getElementById("openX");

chrome.storage.local.get({ concepts: [], apiKey: "", aiOn: false }, (local) => {
  chrome.storage.sync.get({ interestLabels: [] }, (sync) => {
    const mutes = (local.concepts || []).length;
    const interests = (sync.interestLabels || []).length;
    const ai = !!(local.aiOn && local.apiKey);
    const parts = [];
    if (mutes) parts.push(`${mutes} mute${mutes === 1 ? "" : "s"}`);
    if (interests) parts.push(`${interests} interest${interests === 1 ? "" : "s"}`);
    statusEl.className = "popup-status ok";
    statusEl.textContent = parts.length
      ? `Live · ${parts.join(" · ")}${ai ? " · AI on" : ""}`
      : "Ready · open X and start hushing";
  });
});

openApp.addEventListener("click", () => {
  if (chrome.runtime.openOptionsPage) chrome.runtime.openOptionsPage();
  else chrome.tabs.create({ url: "options/index.html" });
});

openX.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://x.com/home" });
});
