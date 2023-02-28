console.log("linked");

//var used for the dad joke api
const options = {
    method: 'GET',
    url: 'https://dad-jokes.p.rapidapi.com/joke/search',
    params: {term: 'cow'},
    headers: {
      'x-rapidapi-key': 'af62c2fa06mshf0b765ef4edb5a1p19978ejsn40af1ecfa88c',
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
    }
};
var userOptions = document.querySelector("#choice");
var userChoice = document.querySelector("#choice").value;
var makeSelection = document.querySelector("#reveal");
const factDisplay = document.querySelector("#fact");
var factArr = ["polar bears aren't actually white"];
var jokeSetup = document.querySelector(".setup").value;
var jokePunchline = document.querySelector(".punchline").value;

async function getDadJoke() {
    var response = await fetch('https://dad-jokes.p.rapidapi.com/random/joke', options)
	    .then(response => response.json())
	    .then(response => console.log(response))
        .then(jokeSetup = response.data("setup"))
        .then(jokePunchline = response.data("punchline"))
	    .catch(err => console.error(err));
}

function getFactOrJoke(element) {
    var answer = element.value;
    console.log("the user wants a " + answer);
    if (answer === "fact") {
        //grab a random fact from the factArr;
        //save to var fact as a string
        factDisplay.innerHTML = "Polar bears aren't actually white.";

    }
    else if (answer === "joke") {
        //grab a random joke from the dadjokes.io API;
        getDadJoke();


        //"setup" and "punchline" need to parsed from the response;
        //save to var setup & punchline as strings
    }
    else {
        //say something else like "maybe next time!";
        //save to var bummer as string
    }
}

function showFactOrJoke()  {
    
    document.querySelector("#fact").classList = "";
}

// function showFactOrJoke() {
//     console.log("revealing!");
//     if (userChoice == "fact") {
//         factDisplay.classList.toggle("hidden");
//     }
//     if (userChoice == "joke") {
//         document.querySelector("#joke").classList.toggle(".hidden");
//     }
// }

//add a submit button that replaces the prompt with the result
//show button once our answer has been updated




