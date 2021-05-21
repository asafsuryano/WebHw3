//const mongoose = require('mongoose');
const axios=require('axios');




document.getElementById("deleteList").style.display="none"
document.getElementById("addSiteForm").style.display="none"
function showAddForm(){
    document.getElementById("addSiteForm").style.display="block"
}

function showDeleteList(){
    document.getElementById("deleteList").style.display="block"
}

async function showItemsInDeleteList(){
    let ul=document.getElementById("deleteList")
    let locations;
    await axios.get("http://localhost:3000/site").then((res)=>{locations=res.data})
    for (let i=0;i<locations['locations'].length;i++){
        let li=document.createElement("li")
        li.onclick="deleteLocation(locationArr['locations'][i]._id)"
        li.appendChild(a)
        ul.appendChild(li)
    }
}

async function deleteLocation(id){
    await axios.delete("http://localhost:3000/site",{data:id}).then(()=>console.log("item deleted successfully"));
}
