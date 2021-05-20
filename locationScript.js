const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Location = mongoose.model('Location', { name: String,details:String,picture:String });

var locationName=localStorage.getItem('1')
async function getLocationByName(){
    let location= await Location.find({name:locationName})
    return location
}
async function showLocationDetails(){
    let location=await getLocationByName()
    document.getElementById("location_header").innerHTML=location.name
    document.getElementById("location_explanation").innerHTML=location.details
    document.getElementById("location_pic").src=location.picture
}

getLocationByName()