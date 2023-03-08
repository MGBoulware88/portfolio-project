const textContainer = document.querySelector("#container");
const userOptions = {
    "select": () => "Please select Joke or Fact first.",
    "joke": getJoke,
    "fact": getFact,
    "repo": getProjects
}
async function getKey() {
    var key = document.querySelector("#selection").value;
    addHTML(key);
}
async function addHTML(key) {
    document.querySelector("#daily").reset();
    while (textContainer.firstChild) {
        textContainer.removeChild(textContainer.lastChild);
    }
    if (userOptions.hasOwnProperty(key)) {
        createHTML(await userOptions[key]());
    }
}
function createHTML(text) {
    var newHTML = document.createElement("p");
    textContainer.append(newHTML);
    newHTML.innerHTML = text;
}
async function getJoke() {
    var response = await axios.get('https://jokeapi-v2.p.rapidapi.com/joke/Any', {
        params: {
            type: 'single',
            format: 'json',
            idRange: '0-319',
            blacklistFlags: 'nsfw,racist,religious,political,sexist,explicit'
        },
        headers: {
            'X-RapidAPI-Key': 'af62c2fa06mshf0b765ef4edb5a1p19978ejsn40af1ecfa88c',
            'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
        }
    });
    var jokeText = response.data.joke;
    return jokeText;
}
async function getFact() {
    var response = await axios.get('https://api.api-ninjas.com/v1/facts?limit=1', {
        headers: {
            'X-Api-Key': 'NMGNlnLpB+44dYy8e0zpaA==jg3p2eZM2e3kygbW'
        }
    });
    var factText = response.data[0].fact;
    return factText;
}

async function getProjects() {
    $.getJSON("https://api.github.com/users/mgboulware88/repos?per_page=53", function (data) {
        data.forEach(function (repo) {
            // $.getJSON(repo.languages_url, function (languages) {
            //     populate(repo.name, repo.pushed_at, repo, Object.keys(languages));
            // })
            if (repo.topics.length > 0) {
                $.getJSON(repo.languages_url, function (languages) {
                    populate(repo.name, repo.pushed_at, repo, Object.keys(languages));
                })
            }
        });
    });
}