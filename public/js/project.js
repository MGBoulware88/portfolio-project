(function () {
    getProjects();
})()

const project_container = document.querySelector(".project-container");


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