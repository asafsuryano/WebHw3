const mongoose = require('mongoose');
const axios=require('axios');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Location = mongoose.model('Location', { name: String,title:String,details:String,picture:String });

var locationId=localStorage.getItem('1')
async function getLocationByName(){
    let location;
    await axios.get("http://localhost:3000/site/"+locationId).then((res)=>{location=res.data}).catch((err)=>console.log(err));
    return location
}
async function showLocationDetails(){
    let location=await getLocationByName()
    document.getElementById("location_header").innerHTML=location.name
    document.getElementById("location_explanation").innerHTML=location.details
    document.getElementById("location_pic").src=location.picture
}

showLocationDetails()