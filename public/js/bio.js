var skill_name = document.querySelector(".subtle").nextElementSibling;
var skill_boxes = document.querySelector(".flex-button-container");

var app_content = document.querySelector(".app-content");

var skills = {
    "Web Development": [
        {
            icon: "bxl-html5",
            name: "HTML5"
        },
        {
            icon: "bxl-css3",
            name: "CSS3"
        }
    ],
    "Python": [
        {
            icon: "bxl-python",
            name: "Python"
        },
        {
            icon: "bxl-flask",
            name: "Flask"
        }
    ]
}
console.log(skills);

function add_skill(icon, name) {
    var button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("button-large");
    var i = document.createElement("i");
    i.classList.add("bx");
    i.classList.add(icon);
    button.appendChild(i);
    button.innerHTML = name;
}