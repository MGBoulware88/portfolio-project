const projects = ["Building a Discord bot", "Build a crypto application", "Building a 2D Game", "Build a website that displays all free software available for software engineers", "Automating tasks with Python", "Building an accelerated/self-paced online education platform", "Implement Flask in portfolio website", "Build websites with APIs", "Build an e-commerce website using React and Typescript", "Create a mock Spotify application", "Build a website that combines all streaming services available"];

function generateIdea() {
    // Get a random topic area
    const randomProject = projects[Math.floor(Math.random() * projects.length)];

    document.querySelector('.idea').innerText = randomProject;
}

document.querySelector('.refresh').addEventListener('click', () => { generateIdea() });

generateIdea()