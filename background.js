chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "gp-set-anchor",
        title: "📌 Create anchor point",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) =>{
    if(info.menuItemId === "gp-set-anchor"){
        chrome.tabs.sendMessage(tab.id, {action: "set-anchor"});
    }

});

