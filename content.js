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

//Do not do anything on header click
header.addEventListener("click", function(event){
    event.stopPropagation();
    console.log("Clicked header");

})

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "set-anchor") {
        anchorCount++;

        //Get the highlighted text
        let highlight = window.getSelection().toString();
        highlight = highlight.trim();
        highlight = highlight.slice(0, 40);
        highlight = highlight.replace(/\s+/g, " ");
        console.log(highlight);

        function getSelectedBlock(){
            //Get the range (start and end containers) as well as the starting node
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
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

        console.log(getSelectedBlock());

        let anchorItem = document.createElement("div");
        anchorItem.textContent = highlight;
        anchorItem.style.padding = "4px";
        anchorItem.style.borderRadius = "4px";
        anchorItem.style.background = "rgb(51,51,51)";
        anchorItem.style.marginTop = "5px";
        panel.appendChild(anchorItem);
        anchorList.push(anchorItem);
        header.textContent = `📌 GPThreads (${anchorCount})`;
        console.log(anchorList);
    }

});




