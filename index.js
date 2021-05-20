const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Location = mongoose.model('Location', { name: String,details:String,picture:String });

function readJsonFile(jsonPath){
    let locationObjects=JSON.parse(jsonPath)
    let num=0
    for (let i=0;i<locationObjects.length;i++){
        let location=new Location({name:locationObjects[i].name,details:locationObjects[i].details,picture:locationObjects[i].picture})
        location.save()
    }
}