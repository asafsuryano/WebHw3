const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const axios=require('axios');

const Location = mongoose.model('Location', { name: String,title:String,details:String,picture:String });
var locations;
function readPathFromHtml(){
    let path=document.getElementById("jsonFile").files[0];
    readJsonFile(path);
}
function readJsonFile(jsonPath){
    let locationObjects=JSON.parse(jsonPath)
    let num=0
    for (let i=0;i<locationObjects.length;i++){
        axios.post("http://localhost:3000/site",{title:locationObjects[i].title,details:locationObjects[i].details,picture:locationObjects[i].picture}).then(
            ()=>{console.log("location posted successfully")}
        ).catch((err)=>{console.log(err)});
    }
}

async function getAllLocations(){
    let locations;
    await axios.get("http://localhost:3000/site").then((res)=>{
        locations=res.data;
    })
    localStorage.setItem('2',locations);
}