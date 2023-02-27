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

var jokeSetup = document.querySelector(".setup").value;
var jokePunchline = document.querySelector(".punchline").value;
//planning an array of fun facts/jokes to rotate throughs

//maybe just pick one at random on page load or set it to different hours of the day, so I would want 24 options

async function getDadJoke() {
    var response = await fetch('https://dad-jokes.p.rapidapi.com/random/joke', options)
	    .then(response => response.json())
	    .then(response => console.log(response))
	    .catch(err => console.error(err));
}

function getFactOrJoke(element) {
    var answer = element.value;
    console.log("the user wants a " + answer);
    if (answer === "fact") {
        //grab a random fact from the factArr;
        //save to var fact as a string
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


//add a submit button that replaces the prompt with the result
//show button once our answer has been updated




// var userChoice = document.querySelector("#choice");

// document.addEventListener("click", (evt) => {
//     let userClick = evt.target; 

//     do {
//         if (userClick == userChoice) { 
//             return;
//         }
//         userClick = userClick.parentNode; 
//     } while (userClick);
//     if (userChoice.classList.contains("hidden")) {
//         userChoice.classList.toggle("hidden");
//     }
// })