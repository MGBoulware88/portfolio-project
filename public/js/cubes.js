select = e => document.querySelector(e);
selectAll = e => document.querySelectorAll(e);

const container = select('.container');
const cuboid = selectAll('.cuboid');
const hiWords = selectAll('.threed-word');
let winW = 0;
let winH = 0;
let pointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

function init() {

    setWinDimensions();

    gsap.set(container, { autoAlpha: 1 });

    gsap.timeline({ delay: 0.5 })
        .from('.threed-location-lat', {
            x: 100,
            autoAlpha: 0,
            ease: 'power4',
            duration: 1
        })
        .from('.threed-location-long', {
            x: -100,
            autoAlpha: 0,
            ease: 'power4',
            duration: 1
        }, 0)
        .from(cuboid, {
            y: winH,
            duration: 3,
            stagger: 0.14,
            ease: 'elastic(0.4,0.3)'
        }, 0);

    gsap.to(cuboid, {
        rotateX: -360,
        duration: 8,
        repeat: -1,
        ease: 'none'
    });

    gsap.fromTo(cuboid, {
        rotateY: 8,
        rotate: -10
    }, {
        rotateY: -8,
        rotate: 10,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
    });
}

function setWinDimensions() {
    winW = window.innerWidth;
    winH = window.innerHeight;
}

function calcOffset(xPos, yPos) {
    let dX = 2 * (xPos - winW / 2) / winW;
    let dY = -2 * (yPos - winH / 2) / winH;
    return [dX, dY];
}

function followPointer(pX, pY) {
    let nPos = calcOffset(pX, pY); // get cursor position from center
    let nX = nPos[0];
    let nY = nPos[1];
    let positiveX = Math.sqrt(nX * nX);
    let positiveY = Math.sqrt(nY * nY);
    let deltaS = 450 * positiveX;
    let deltaW = 600 * positiveY;
    gsap.to(hiWords, {
        fontStretch: `${(550 - deltaS)}%`,
        fontWeight: 800 - deltaW,
        duration: 2
    });
}

window.addEventListener("mousemove", function (event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    followPointer(pointer.x, pointer.y);
});

window.addEventListener('touchmove', function (event) {
    pointer.x = event.touches[0].clientX;
    pointer.y = event.touches[0].clientY;
    followPointer(pointer.x, pointer.y);
});

window.addEventListener('touchstart', function (event) {
    pointer.x = event.touches[0].clientX;
    pointer.y = event.touches[0].clientY;
    followPointer(pointer.x, pointer.y);
});

window.onload = () => {
    init();
};