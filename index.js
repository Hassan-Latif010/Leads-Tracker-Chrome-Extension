

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let myLeads = []
let oldLeds = []


if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
    
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
}) 

function render(leads){
    let listItems = []
    for(let i=0; i<myLeads.length; i++){
        
        listItems += `<li><a href='${leads[i]}' target="_blank" class="abc">${leads[i]}</a></li>`    
    }
    ulEl.innerHTML = listItems 

} 

delBtn.addEventListener("click",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
    
})

inputBtn.addEventListener("click",handleClick)
function handleClick(){
    let x=inputEl.value
    myLeads.push(x)
    
    inputEl.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)   
} 


