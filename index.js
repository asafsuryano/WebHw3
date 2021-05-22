//import axios from './node_modules/axios';
//var fs=import('fs')

//const { read } = require("fs");
var readerAvailable=1;
var numOfLocations;
var numOfPosted=0;
var locations;
var jsonString;
var normalPath="http://localhost:4000/sites/";
var pictureFile;
var reader=new FileReader();
reader.onload=((evt)=>{
        jsonString=evt.target.result;
        readJsonString();
})
async function readPathFromHtml(){
    let path=document.getElementById("jsonFile").files[0];
    readFileContent(path);
}
async function readJsonString(){
    let locationObjects=JSON.parse(jsonString)['locations'];
    numOfLocations=locationObjects.length;
    for(let i=0;i<locationObjects.length;i++){
        await postLocation(locationObjects[i]);
    }
}

async function getAllLocations(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status === 200 || xhr.status == 0)
            {
                locations=xhr.responseText;
                console.log(locations);
                localStorage.setItem('2',locations)
            }
        }
        else 
        {
            console.log("there was a problem");
        }
    }
    xhr.open("GET", normalPath, true);
    xhr.send(null);

}

async function readFileContent(path){
    reader.readAsText(path,"UTF-8");
}

async function postLocation(locationJson){
    console.log(locationJson);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status === 201 || xhr.status == 0)
            {
                numOfPosted++;
                console.log(numOfPosted);
                if (numOfPosted===numOfLocations){
                    getAllLocations();
                }
            }
        }
    }
    xhr.open("POST",normalPath,true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(locationJson));
}