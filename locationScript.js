var normalPath="http://localhost:4000/sites";
var locationId=localStorage.getItem('1')
async function getLocationByName(){
    let location;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status === 200 || xhr.status == 0)
            {
                location=JSON.parse(xhr.response);
                showLocationDetails(location);
            }
        }
    }
    xhr.open("GET", normalPath+'/'+locationId, true);
    xhr.send(null);
}
async function showLocationDetails(location){
    document.getElementById("location_header").innerHTML=location.title;
    document.getElementById("location_explanation").innerHTML=location.details;
    document.getElementById("location_pic").src=location.path;
}

getLocationByName()