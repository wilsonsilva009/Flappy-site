var FirebaseURL = "https://flappy-pip-default-rtdb.europe-west1.firebasedatabase.app/"

var ShowingError = false;
function ShowError(Message){
    if (ShowingError) return;

    ShowingError = true;
    
    const ErrorHolder = document.querySelector(".error-holder")
    const ErrorLabel = document.querySelector(".error-holder label");

    ErrorHolder.style.opacity = "1";
    ErrorLabel.innerHTML = "Erro: " + Message;

    setTimeout(function() {
        ErrorHolder.style.opacity = "0";
        ShowingError = false;
    }, 2000);

}

async function UserExists(User) {
    var URL = FirebaseURL + User + ".json";
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        
        if (data !== null) {
            return true;
        }

        return false;

    } catch (error) {
        console.error("Error fetching user data:\n", error);
        return false;
    }
}

async function Login(){
    const Username = document.getElementById("username").value;
    const Password = document.getElementById("password").value;
    
    var URL = FirebaseURL + Username + ".json";

    try {
        const response = await fetch(URL);
        const data = await response.json();
        
        if (data !== null) {
            if (data.password == Password) {
                localStorage.setItem("Username",Username)
                window.location.href = "profile.html"
            } else {
                ShowError("Login inválido");
            }
        }

    } catch (error) {
        console.error("Error fetching user data:\n", error);
    }
}


async function Register(){
    const Username = document.getElementById("username").value;
    const Password = document.getElementById("password").value;


    if (Username == "" || Password == ""){
        ShowError("Dados inválidos");
        return;
    }


    const Exists = await UserExists(Username);
    if (Exists){
        ShowError("O utilizador já existe");
        return;
    }

    var URL = FirebaseURL + Username + ".json";

    var DATA =  {
        "coins": 0,
        "password": Password,
        "powers" : {
            "MoreCoins": 0,
            "DoubleCoins": 0,
            "SeeAhead": 0,
            "SlowTime": 0,
            "SmallSize": 0,
            "Invulnerability": 0
        }
    }

    const jsonData = JSON.stringify(DATA);

    fetch(URL, {
        method: 'PUT',
        headers: {},
        body: jsonData
    })
    .then(response => response.json())
    .then(data => console.log('Data: ', data))
    .catch(error => console.error('Erro ao enviar dados:', error));

} 