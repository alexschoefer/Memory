import "./styles/style.scss";
import { init, setCurrentTheme, showCurrentPage } from "./ts/pages/start";
import { gameSettings, initSettings } from "./ts/pages/settings";
import { startGame, resetGame } from "./ts/pages/game";

// Start the app
init();

// Set game settings
document.getElementById("play-btn")?.addEventListener("click", () => {
    showCurrentPage("settings-page");
    setCurrentTheme("settings-theme");
});

initSettings();

// Start game
document.getElementById("start-game-btn")?.addEventListener("click", () => {
    showCurrentPage("game-page");
    setCurrentTheme(`${gameSettings.theme}-theme`);
    startGame();
});

// Game-over and return to settings
document.getElementById("go_back_btn")?.addEventListener("click", () => {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("page--active"));
    showCurrentPage("start-page");
    setCurrentTheme("start-theme");
    resetGame();
});

document.getElementById("exit-game-btn")?.addEventListener("click", showExitOverlay);

function showExitOverlay(): void {
    const overlay = document.getElementById("game-exit-overlay");

    if (!overlay) return;

    overlay.classList.add("game-exit-overlay__container--active");
    document.body.classList.add("no-scroll");
}

document.getElementById("back_game")?.addEventListener("click", closeExitOverlay);

function closeExitOverlay(): void {
    const overlay = document.getElementById("game-exit-overlay");

    if (!overlay) return;

    overlay.classList.remove("game-exit-overlay__container--active");
    document.body.classList.remove("no-scroll");
}

document.getElementById("quit_game")?.addEventListener("click", goBackToSettings);

function goBackToSettings() {
    showCurrentPage("settings-page");
    setCurrentTheme("settings-theme");
    const overlay = document.getElementById("game-exit-overlay");

    if (!overlay) return;

    overlay.classList.remove("game-exit-overlay__container--active");
    document.body.classList.remove("no-scroll");
    resetGame();
}


