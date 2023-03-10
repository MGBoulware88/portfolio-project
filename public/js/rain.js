// set up
const canvas = document.getElementById("main");
const middle = document.getElementById("middle");
const final = document.getElementById("final");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
middle.width = window.innerWidth;
middle.height = window.innerHeight;
final.width = window.innerWidth;
final.height = window.innerHeight;

// mouse
const mouse = {
    x: NaN,
    y: NaN,
    prevX: 0,
    prevY: 0,
    dead: false,
    right() {
        return this.x >= this.prevX;
    }
};
const touchStart = "touchstart";
const movements = ["mousemove"];
const touchMove = "touchmove";
const leaves = ["touchend", "mouseleave", "mouseout"];
function getMousePos(current, evt) {
    const rect = current.getBoundingClientRect();
    return {
        x: evt.pageX - rect.left,
        y: evt.pageY - rect.top
    };
}
function convertTouchToMouse(canvas, event) {
    return getMousePos(canvas, event.touches[0]);
}
function updateMouse(x, y) {
    mouse.prevX = mouse.dead ? 0 : mouse.x;
    mouse.prevY = mouse.dead ? 0 : mouse.y;

    mouse.x = x;
    mouse.y = y;
}
function setUpEvent() {
    window.addEventListener(touchStart, function (event) {
        event.preventDefault();
        const { x, y } = convertTouchToMouse(canvas, event);
        event.preventDefault();
        mouse.dead = false;
        updateMouse(x, y);
    });
    movements.forEach((move) => {
        window.addEventListener(move, function (event) {
            event.preventDefault();
            const { x, y } = getMousePos(canvas, event, mouse);
            mouse.dead = false;
            updateMouse(x, y);
        });
    });

    window.addEventListener(touchMove, function (event) {
        event.preventDefault();
        const { x, y } = convertTouchToMouse(canvas, event);
        mouse.dead = false;
        updateMouse(x, y);
    });

    leaves.forEach((move) => {
        window.addEventListener(move, function (event) {
            event.preventDefault();
            updateMouse(NaN, NaN);
            mouse.dead = true;
        });
    });
}

///https://levelup.gitconnected.com/using-prototype-vs-this-in-a-javascript-class-can-help-save-memory-816636418c3e
const colors = [
    {
        canvas: document.getElementById("main"),
        context: document.getElementById("main").getContext("2d"),
        drops: [],
        color: "#00FFFC",
        speed: 1.5,
        radius: 1
    },
    {
        canvas: document.getElementById("middle"),
        context: document.getElementById("middle").getContext("2d"),
        drops: [],
        color: "#FC00FF",
        speed: 2,
        radius: 2
    },
    {
        canvas: document.getElementById("final"),
        context: document.getElementById("final").getContext("2d"),
        drops: [],
        color: "#fffc00",
        speed: 2.5,
        radius: 3
    }
];

const triadic = ["#00FFFC", "#FC00FF", "#fffc00"];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

class Drop {
    constructor(color, yVelocity, radius, current) {
        this.xPos = Math.random() * (window.innerWidth - 20);
        this.yPos = Math.random() * 20;
        this.fallSpeed = Math.random() * 0.5 + 0.5 + yVelocity;
        this.radius = radius;
        this.color = color;
        this.end = false;
        this.canvas = current;
        this.xDirection = 0;
    }
}
//
Drop.prototype.draw = function drawDrop() {
    // console.log(this.y);
    // console.log(this.color)
    let radius = this.radius;
    let current = this.canvas;
    current.beginPath();

    current.moveTo(this.xPos - radius, this.y);

    if (this.xDirection !== 0) {
        current.arc(this.xPos, this.yPos, radius, 0, 2 * Math.PI);
    } else {
        current.lineTo(this.xPos, this.yPos - 20);
        current.lineTo(this.xPos + radius, this.y);

        current.arc(this.xPos, this.yPos, radius, 0.25 * Math.PI, 0.75 * Math.PI);
    }

    current.fillStyle = this.color;
    current.closePath();
    current.fill();
    return this;
};
//
Drop.prototype.fall = function dropFall() {
    this.yPos += this.fallSpeed;
    this.xPos += this.xDirection;
    if (this.xDirection === 0) {
        this.xDirection = 0;
    } else if (this.xDirection < 0) {
        this.xDirection += 0.02;
    } else {
        this.xDirection -= 0.02;
    }
    if (this.yPos >= window.innerHeight + this.radius) {
        this.end = true;
    }
    return this;
};
let check = false;
function checkCollision(drop, touch) {
    // if(check){
    //   return;
    // }
    if (touch.dead) {
        return;
    }
    if (
        drop.xPos > touch.x &&
        drop.yPos > touch.y &&
        drop.xPos < touch.x + 25 &&
        drop.yPos < touch.y + 25
    ) {
        drop.yPos -= 5;
        drop.yVelocity *= -5;
        drop.xDirection = touch.right() ? -5 : 5;
        drop.color = "white";
        // alert("!");
    }
    // console.log(drop.xPos, touch.x);
    check = true;
    return drop.xPos === touch.x && drop.yPos === touch.y;
}
function updateDrops(array, cb) {
    for (let i = array.length - 1; i >= 0; i--) {
        array[i].fall();
        if (array[i].end === true) {
            // start - start of position to make change
            // delete - 1 from the index we passed in
            array.splice(i, 1);
        }
    }
    if (array.length < window.innerWidth / sizeFactor) {
        cb();
    }
}

function animate(current, yVelocity, radius, drops) {
    // fill the canvas with the orange background
    let color = triadic[getRandomIntInclusive(0, triadic.length - 1)];
    current.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // make all drops fall and then redraw them
    for (let i = drops.length - 1; i >= 0; i--) {
        drops[i].fall();
        if (drops[i].end === true) {
            // start - start of position to make change
            // delete - 1 from the index we passed in
            drops.splice(i, 1);
        } else {
            checkCollision(drops[i], mouse);
            drops[i].draw();
        }
    }
    if (drops.length < window.innerWidth / 4) {
        drops.push(new Drop(color, yVelocity, radius, current));
    }
    requestAnimationFrame(() => {
        animate(current, yVelocity, radius, drops);
    });
}

const startAnimation = () =>
    requestAnimationFrame(() => {
        for (let element of colors) {
            // console.log(element);
            animate(element.context, element.speed, element.radius, element.drops);
        }
    });
window.addEventListener("load", () => {
    setUpEvent();
    startAnimation();
});
function reset(canvasObject) {
    canvasObject.canvas.width = window.innerWidth;
    canvasObject.canvas.height = window.innerHeight;
    canvasObject.drops = [];
}

window.addEventListener("resize", () => {
    for (let element of colors) {
        reset(element);
    }
    startAnimation();
});
