var ul = document.getElementById("sites_list");
var normalPath = "http://localhost:4000/sites";

function createList(locationsArr) {
    ul.innerHTML = '';
    for (var i = 0; i < locationsArr.length; i++) {
        var a = document.createElement("a");
        a.setAttribute('href', "./locationPage.html");
        let li = document.createElement("li")
        let value = locationsArr[i]._id;
        li.setAttribute('id', value);
        li.setAttribute('onclick', "saveLocationName(this.id)");
        li.className="list-group-item";
        a.innerHTML = locationsArr[i].title;
        li.appendChild(a)
        ul.appendChild(li)

    }
}

function saveLocationName(name) {
    console.log(name);
    localStorage.setItem('1', name)
}
//let locationsArr=localStorage.getItem('2');
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status == 0) {
            let locations = JSON.parse(xhr.response);
            createList(locations);
        }
    }
}
xhr.open("GET", normalPath, true);
xhr.send(null);