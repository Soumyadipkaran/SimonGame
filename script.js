let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame);

function startGame() {
    if (!started) {
        started = true;
        levelup();
    }
}

function flash(btn, duration) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, duration);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randColor = btns[Math.floor(Math.random() * btns.length)];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    flash(randbtn, 200);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        gameOver();
    }
}

function btnPress() {
    let btn = this;
    flash(btn, 100);
    userSeq.push(btn.getAttribute("id"));
    checkAns(userSeq.length - 1);
}

function gameOver() {
    h2.innerHTML = `Game Over! <br> Your Score Was <b>${level} <br> Press Any Key To Start`;
    document.querySelector("body").style.backgroundColor = "rgb(244, 102, 102)";
    document.removeEventListener("keydown", startGame);
    document.removeEventListener("touchstart", startGame);
    document.addEventListener("keydown", reset);
    document.addEventListener("touchstart", reset);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.querySelector("body").style.backgroundColor = "rgb(91, 250, 242)";
    document.removeEventListener("keydown", reset);
    document.removeEventListener("touchstart", reset);
    document.addEventListener("keydown", startGame);
    document.addEventListener("touchstart", startGame);
    startGame();  // Start the game immediately after resetting
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});
