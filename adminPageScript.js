var normalPath = "http://localhost:4000/sites";
var locations;
document.getElementById("deleteList").style.display = "none"
document.getElementById("addSiteForm").style.display = "none"
document.getElementById("submitSite").style.display = "none"

function showAddForm() {
    document.getElementById("deleteList").style.display = "none"
    document.getElementById("addSiteForm").style.display = "block"
    document.getElementById("submitSite").style.display = "block"
}

function showDeleteList() {
    document.getElementById("addSiteForm").style.display = "none"
    document.getElementById("submitSite").style.display = "none"
    document.getElementById("deleteList").style.display = "block"
    getAllLocations();
}

async function showItemsInDeleteList() {
    let ul = document.getElementById("deleteList");
    ul.innerHTML = '';
    for (let i = 0; i < locations.length; i++) {
        let li = document.createElement("li")
        console.log(locations[i]._id);
        li.setAttribute('id', locations[i]._id);
        li.innerHTML = locations[i].title;
        li.setAttribute('onclick', "deleteLocation(this.id)");
        ul.appendChild(li)
    }
}


async function getAllLocations() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status == 0) {
                locations = JSON.parse(xhr.response);
                localStorage.setItem('2', locations);
                showItemsInDeleteList();
            }
        }
    }
    xhr.open("GET", normalPath, true);
    xhr.send(null);
}

function deleteLocation(id) {
    console.log("hello from delete");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", normalPath + '/' + id, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("deleted successfully");
                updateLocalStorage();

            }
        }
    }
    xhr.send(null);
}

function addTouristLocation() {
    console.log("before title");
    let title = document.getElementById("siteName").value;
    console.log("before details");
    let details = document.getElementById("siteDescription").value;
    console.log("before path");
    let fileName = document.getElementById("siteImg").files[0];
    let locationJson = { "title": title, "details": details };
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            if (xhr.status === 201) {
                console.log("location added successsfully");
                updateLocalStorage();
            }
        }
    }
    xhr.open("POST", normalPath, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(locationJson));
}

function updateLocalStorage() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status == 0) {
                locations = xhr.response;
                localStorage.setItem('2', locations);
                window.location.reload();
            }
        }
    }
    xhr.open("GET", normalPath, true);
    xhr.send(null);
}