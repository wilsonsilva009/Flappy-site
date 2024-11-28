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
        } else{
            ShowError("Utilizador não existe");
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
		"password": "",
		"powers" : {
			"MoreCoins": 0,
			"DoubleCoins": 0,
			"SeeAhead": 0,
			"SlowTime": 0,
			"SmallSize": 0,
			"Invulnerability": 0
		},
		"achievements" : {
			"Online" : {
				"Description" : "Login for the first time",
				"Progress" : [0,1]
			},
			"The beginning" : {
				"Description" : "Survive for 30 seconds",
				"Progress" : [0,30]
			},
			"Bring home the bacon" : {
				"Description" : "Collect 50 coins",
				"Progress" : [0,50]
			},
			"What a deal!" : {
				"Description" : "Buy something from the shop",
				"Progress" : [0,1]
			},
			"Streamlined" : {
				"Description" : "Use an item",
				"Progress" : [0,1]
			},
			"All over again" : {
				"Description" : "Survive until sunrise",
				"Progress" : [0,1]
			}
		},
		"stats" : {
			"GamesPlayed" : 0,
			"SecondsSurvived" : 0,
			"DistanceTraveled" : 0,
			"CoinsCollected" : 0,
			"CoinsSpent" : 0,
			"ObstaclesOvercome" : 0,
			"FavoritePower" : 0
		}
	}

    DATA["password"] = Password;

    const jsonData = JSON.stringify(DATA);

    // Fix here -------------------------------------------------------
    await fetch(URL, {
        method: 'PUT',
        headers: {},
        body: jsonData
    })

    localStorage.setItem("Username",Username)
    window.location.href = "profile.html"

} 