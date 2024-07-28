function RedirectToHomePage() {
    window.location.href = "nextSignUp.html";
}

function valid(result) {
    let again = String("again");
    console.log(result, typeof result, again, typeof again);
    if (result == "success") {
        RedirectToHomePage();
    }
    else if (result == "again") {
        alert("wrong password");
    }
    else {
        alert("wrong username");
    }
}

function login() {
    let user = document.getElementById("name").value;
    let password = document.getElementById("pass").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"user":user,"password":password});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://f6ulgapabi.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => valid(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}

function signup() {
    let user1 = document.getElementById("name1").value;
    let email1 = document.getElementById("email1").value;
    let password1 = document.getElementById("pass1").value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"user":user1,"email":email1,"password":password1});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://ceprpxo2lh.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => RedirectToHomePage())
    .catch(error => console.log('error', error));
}