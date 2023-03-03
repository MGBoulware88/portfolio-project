(function() {
    getProjects();
})()

const textContainer = document.querySelector("#container");
const project_container = document.querySelector(".project-container");

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
    var response = await axios.get('https://jokeapi-v2.p.rapidapi.com/joke/Any',{
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
    console.log(jokeText);
    return jokeText;
}

async function getFact() {
    var response = await axios.get('https://fun-facts1.p.rapidapi.com/api/fun-facts',{
        headers: {
            'X-RapidAPI-Key': 'af62c2fa06mshf0b765ef4edb5a1p19978ejsn40af1ecfa88c',
            'X-RapidAPI-Host': 'fun-facts1.p.rapidapi.com'
          }
    });
    var factText = response.data.fact;
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

function populate(name, pushed_at, repo, languages) {
    var card = document.createElement("div");
    card.classList.add("card");

    addLanguages(languages, card);

    var title = document.createElement("a");
    title.classList.add("card-title");
    name_parts = name.split("-");
    name_parts.forEach(element => {
        name = toTitleCase(element);
        title.innerHTML += " " + name;
    });
    title.setAttribute("href", repo.html_url);
    card.appendChild(title);

    var date = pushed_at.split("T")[0];
    var date_0 = date.split("-");

    var year = date_0[0];
    var month = date_0[1];
    var day = date_0[2];

    var p = document.createElement("p");
    p.innerHTML = "Last updated on:";
    p.classList.add("m-0");
    card.appendChild(p);

    var last_updated = document.createElement("p");
    last_updated.innerHTML = month + "/" + day + "/" + year;
    card.appendChild(last_updated);

    project_container.appendChild(card);
}

function addLanguages(languages, card) {
    var lang_icons = document.createElement("div");
    lang_icons.classList.add("d-flex");
    lang_icons.classList.add("lang-icons");


    var icon = document.createElement("i");
    icon.classList.add("bx");
    if (languages.length == 0) {
        icon.innerHTML = "";
    }
  
    if (languages.includes("HTML")) {
        var icon2 = document.createElement("i");
        icon2.classList.add("bx");
        icon2.classList.add("bxl-html5");
        icon2.classList.add("html");
        lang_icons.appendChild(icon2);
    }
    if (languages.includes("Python")) {
        var icon3 = document.createElement("i");
        icon3.classList.add("bx");
        icon3.classList.add("bxl-python");
        icon3.classList.add("python");
        lang_icons.appendChild(icon3);
    }
    if (languages.includes("JavaScript")) {
        var icon4 = document.createElement("i");
        icon4.classList.add("bx");
        icon4.classList.add("bxl-javascript");
        icon4.classList.add("javascript");
        lang_icons.appendChild(icon4);
    }
    if (languages.includes("CSS")) {
        var icon5 = document.createElement("i");
        icon5.classList.add("bx");
        icon5.classList.add("bxl-css3");
        icon5.classList.add("css");
        lang_icons.appendChild(icon5);
    }
    if (languages.includes("Java")) {
        var icon6 = document.createElement("i");
        icon6.classList.add("bx");
        icon6.classList.add("bxl-java");
        icon6.classList.add("java");
        lang_icons.appendChild(icon6);
    }
    lang_icons.appendChild(icon);
    card.appendChild(lang_icons);

}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}