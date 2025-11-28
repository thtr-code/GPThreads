console.log("GPThreads content script loaded!");


const panel = document.createElement("div")
panel.style.position = "fixed";
panel.style.bottom = "20px";
panel.style.right = "20px";
panel.style.padding = "10px";
panel.style.background = "rgb(51,51,51)";
panel.style.color = "white";
panel.style.borderRadius = "6px";
panel.style.zIndex = "99999";

const header = document.createElement("div");
header.textContent = "📌 GPThreads (0)";
header.style.fontWeight = "bold";
header.style.marginBottom = "6px";

const anchorItem = document.createElement("div");
anchorItem.textContent = "Test Anchor HardCode";
anchorItem.style.padding = "4px";
anchorItem.style.borderRadius = "4px";
anchorItem.style.background = "rgb(51,51,51)";
anchorItem.style.marginTop = "5px";


document.body.appendChild(panel);
panel.appendChild(header);
panel.appendChild(anchorItem);


panel.addEventListener("click", function(){
    console.log("clicked");
});

anchorItem.addEventListener("click", function(){
    console.log("clicked anchor");

})