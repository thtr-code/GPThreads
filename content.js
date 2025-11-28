console.log("GPThreads content script loaded!");


const panel = document.createElement("div")
panel.style.position = "fixed";
panel.style.bottom = "20px";
panel.style.right = "20px";
panel.style.padding = "10px";
panel.style.background = "black";
panel.style.color = "white";
panel.style.borderRadius = "6px";
panel.style.zIndex = "99999";

const header = document.createElement("div");
header.textContent = "📌 GPThreads (0)";
header.style.fontWeight = "bold";
header.style.marginBottom = "6px";


document.body.appendChild(panel);
panel.appendChild(header);