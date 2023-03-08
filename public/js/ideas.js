const projects = ["Building a Discord bot", "Build a crypto application", "Building a 2D Game", "Build a website that displays all free software available for software engineers", "Automating tasks with Python", "Building an accelerated/self-paced online education platform", "Implement Flask in portfolio website", "Build websites with APIs", "Build an e-commerce website using React and Typescript", "Create a mock Spotify application", "Build a website that combines all streaming services available"];

var next_button = document.querySelector(".next-button");
var idea = document.querySelector(".idea");
idea.innerHTML = projects[0];
var i = 1;

function generateIdea() {
    next_button.addEventListener("click", function () {
        if (i < projects.length) {
            idea.innerHTML = projects[i];
            i++;
        }
        else {
            i = 0;
        }
    });
}

generateIdea()