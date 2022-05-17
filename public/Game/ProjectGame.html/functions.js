
// let okCount = 0;
// Pause button clicked

function paused() {
    if (pause) {
        pause = false;
        game = false;
        pauseEl.style.display = "flex";
        victoryEL.style.display = "none";
        
    }
}

function resumed() {
    if (!pause ) {
        pause = true;
        game = false;
        menuEl.style.display = "none";
        pauseEl.style.display = "none";
        defeatEl.style.display = "none";
       
        victoryEL.style.display = "none";
        score.style.display = "flex";
        arrowL.style.display = "flex";
        arrowR.style.display = "flex";
        buttonEl.style.display = "flex";
        canvas.style.opacity = "100%";
        tutorialEl.style.display = 'none';
        backButtonEl.style.display = "none";
        
        // if(okCount == 0) {
        //      bonusEl.style.display = 'flex';
        //      okCount += 1;
        // }
    }
}

// function ok() {
//     if(pause) {
//         menuEl.style.display = "none";
//         pauseEl.style.display = "none";
//         defeatEl.style.display = "none";
//         bonusEl.style.display = 'none';
//         victoryEL.style.display = "none";
//         score.style.display = "flex";
//         arrowL.style.display = "flex";
//         arrowR.style.display = "flex";
//         buttonEl.style.display = "flex";
//         canvas.style.opacity = "100%";
//         tutorialEl.style.display = 'none';
//         backButtonEl.style.display = "none";
//     }
// }

function tutorial() {
    if (!pause && !game) {
        pause = false;
        pauseEl.style.display = "none";
        buttonEl.style.display = "none";
        tutorialEl.style.display = "flex";
        backButtonEl.style.display = "flex";
        arrowL.style.display = "none"
        arrowR.style.display = "none"
    }
    if (!pause && game) {
        game = true;
        menuEl.style.display = "none";
        buttonEl.style.display = "none";
        tutorialEl.style.display = "flex";
        backButtonEl.style.display = "flex";
        arrowL.style.display = "none"
        arrowR.style.display = "none"
    }
}

function menu2() {
    pause = false;
    game = true;
    pauseEl.style.display = "none";
    defeatEl.style.display = "none";
    victoryEL.style.display = "none";
    menuEl.style.display = "flex";
    arrowL.style.display = "none";
    arrowR.style.display = "none";
    buttonEl.style.display = "none";
    score.style.display = "none";
    canvas.style.opacity = "0%";
    reset();
}

function backToPause() {
    if (!pause && !game) {
        pause = false;
        game = false;
        menuEl.style.display = "none";
        pauseEl.style.display = "flex";
        buttonEl.style.display = "flex";
        tutorialEl.style.display = "none";
        backButtonEl.style.display = "none";
        arrowL.style.display = "flex"
        arrowR.style.display = "flex"
    }
    if (!pause && game) {
        pause = false;
        game = true;
        pauseEl.style.display = "none";
        menuEl.style.display = "flex";
        buttonEl.style.display = "none";
        tutorialEl.style.display = "none";
        backButtonEl.style.display = "none";
    }
}