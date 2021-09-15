let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs: " + date.getMinutes() + " Mins: " + date.getSeconds() + " Secs: ";
}

function makePromiseCall(methodType, url, async = true, data = null){
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            // console.log(methodType + "State change called at: " +showTime() + " Ready State: " + xhr.readyState + " Status: " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("handle 400 Client Error or 500 Server Error at: "+showTime());
                }
            }
        }
        xhr.open(methodType,url,true);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to server at: " +showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employees/";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: "+showTime()+ " Data: " +responseText)
    })
    .catch(error => console.log("GET Error Status: "+JSON.stringify(error)));
console.log("Made GET AJAX Call to Server at "+showTime());

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("Get Deleted at: "+showTime()+ " Data: " +responseText)
    })
    .catch(error => console.log("DELETE Error Status: "+JSON.stringify(error)));
console.log("Made DELETE AJAX call to server at : " + showTime());

const postURL = "http://localhost:3000/employees"
const emplData = {"name": "Vanshika","salary": "700000"};
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("User Added at: "+showTime()+ " Data: " +responseText)
    })
    .catch(error => console.log("POST Error Status: "+JSON.stringify(error)));
console.log("Made POST AJAX call to server at : " + showTime());