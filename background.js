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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.action === "save-anchors"){
        const convoID = msg.convoID;
        const anchors = msg.anchors;
        chrome.storage.local.set({[convoID]: anchors});
    }
    if(msg.action === "get-anchors"){
        chrome.storage.local.get(msg.convoID, (result) => {
            sendResponse(result[msg.convoID] || []);

        });

        return true;
    }

});
