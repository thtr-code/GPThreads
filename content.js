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
panel.addEventListener("click", function(){
    anchorCount++;
    let anchorItem = document.createElement("div");
    anchorItem.textContent = "Test Anchor" + anchorCount;
    anchorItem.style.padding = "4px";
    anchorItem.style.borderRadius = "4px";
    anchorItem.style.background = "rgb(51,51,51)";
    anchorItem.style.marginTop = "5px";
    //Do not do anything on anchor click
    anchorItem.addEventListener("click", function(event) {
        event.stopPropagation();
        console.log("Clicked anchor #X");
    });


    panel.appendChild(anchorItem);
    anchorList.push(anchorItem);
    header.textContent = `📌 GPThreads (${anchorCount})`;
    console.log(anchorList);

});





