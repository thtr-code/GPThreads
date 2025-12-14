console.log("GPThreads content script loaded!");

let anchorList = [];

const panel = document.createElement("div")
panel.style.position = "fixed";
panel.style.bottom = "20px";
panel.style.right = "20px";
panel.style.padding = "10px";
panel.style.background = "rgb(51,51,51)";
panel.style.color = "white";
panel.style.borderRadius = "6px";
panel.style.zIndex = "99999";

let anchorCount = 0;
const header = document.createElement("div");
header.textContent = `📌 GPThreads (${anchorCount})`;
header.style.fontWeight = "bold";
header.style.marginBottom = "6px";

document.body.appendChild(panel);
panel.appendChild(header);
let chatURL = window.location.pathname;
chatURL = chatURL.split("/")[chatURL.split("/").length - 1];

chrome.storage.local.get(chatURL, (result) => {
    const anchors = result[chatURL] || [];
    console.log(anchors);
});


//Do not do anything on header click
header.addEventListener("click", function(event){
    event.stopPropagation();
    console.log("Clicked header");

})

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "set-anchor") {
        anchorCount++;
        let id = anchorCount;


        //Get the highlighted text
        let highlight = window.getSelection().toString();
        highlight = highlight.trim();
        highlight = highlight.slice(0, 40);
        highlight = highlight.replace(/\s+/g, " ");
        console.log(highlight);


        console.log(chatURL);

        function getSelectedBlock(){
            //Get the range (start and end containers) as well as the starting node
            const range = window.getSelection().getRangeAt(0);
            let node = range.startContainer;

            //If the node is a text node, get the parent node. Block elements are much more stable
            if(node.nodeType === Node.TEXT_NODE){
                node = node.parentNode;
            }
            while(node && node !== document.body){
                const style = window.getComputedStyle(node);

                if(style.display !== "inline" && style.display !== "inline-block"){

                    return node;
                }
                node = node.parentNode;

            }
            return node;

        }
        const block = getSelectedBlock();
        console.log(block);

        const root = block.closest("[data-message-id]");

        function rootPath(root, target){
             let path = [];
             let current = target;
             while(current && current !== root){
                let index = Array.from(current.parentElement.children).indexOf(current);
                path.unshift(index);
                current = current.parentElement;

             }
             return path;

        }

        function reconstructPath(locator){
            let root = document.querySelector(`[data-message-id="${locator.messageID}"]`);
            if(!root){ return null; }

            for (let i = 0; i < locator.path.length; i ++){

                let current = root.children[locator.path[i]];
                if(!current){
                    console.log("Could not find element at path", locator.path);

                    return null;
                }
                root = current;
            }
            return root;
        }

        //1 Create anchor item and define the index
        const anchorItem = document.createElement("div");
        anchorItem.dataset.id = id;


        //2 If the anchor item is clicked, scroll to the corresponding index
        anchorItem.addEventListener("click", function(event){
            event.stopPropagation();
            const id = Number(anchorItem.dataset.id);
            const anchor = anchorList.find(a => a.id === id);
            if (!anchor) return;

            let reconstructedPath = reconstructPath(anchor.locator);


            if (reconstructedPath) {
                reconstructedPath.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        })

        anchorItem.textContent = highlight;
        anchorItem.style.padding = "4px";
        anchorItem.style.borderRadius = "4px";
        anchorItem.style.background = "rgb(51,51,51)";
        anchorItem.style.marginTop = "5px";
        panel.appendChild(anchorItem);

        const messageID = root.getAttribute("data-message-id");
        const path = rootPath(root, block); // (path , target)
        const snippet = (block.innerText || "").trim().replace(/\s+/g, " ").slice(0, 80);
        const tagName = block.tagName;
        console.log("ROOT:", root);

        //save anchor data
        anchorList.push({
            id: id,
            label: highlight,
            locator: {
                messageID: messageID,
                path: path,
                snippet: snippet,
                tagName: tagName
            }
        })
        chrome.runtime.sendMessage({action: "save-anchors", convoID: chatURL, anchors: anchorList});

        header.textContent = `📌 GPThreads (${anchorCount})`;
      //  console.log(anchorList);
    }

});



