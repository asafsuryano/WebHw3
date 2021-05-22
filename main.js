

var ul=document.getElementById("sites_list");
function createList(locationsArr){
    ul.innerHTML='';
    for (var i=0;i<locationsArr.length;i++){
        var a=document.createElement("a");
        a.setAttribute('href',"./locationPage.html");
        let li=document.createElement("li")
        let value=locationsArr[i]._id;
        li.setAttribute('id',value);
        li.setAttribute('onclick',"saveLocationName(this.id)");
        a.innerHTML=locationsArr[i].title;
        li.appendChild(a)
        ul.appendChild(li)
        
    }
}
function saveLocationName(name){
    console.log(name);
    localStorage.setItem('1',name)
}
let locationsArr=localStorage.getItem('2');
if (typeof(locationsArr)===typeof("")){
    createList(JSON.parse(locationsArr));
}else{
    createList(locationsArr);

}