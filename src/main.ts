import "./styles/style.scss";
import { init, setCurrentTheme, showCurrentPage } from "./ts/pages/start";
import { initSettings } from "./ts/pages/settings";
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
    setCurrentTheme("coding-theme");
    startGame();
});

// Exit game and return to settings
document.getElementById("exit-game-btn")?.addEventListener("click", () => {
    showCurrentPage("settings-page");
    setCurrentTheme("settings-theme");

});

// Game-over and return to settings
document.getElementById("go_back_btn")?.addEventListener("click", () => {
    showCurrentPage("settings-page");
    setCurrentTheme("settings-theme");
    resetGame();
    document.querySelectorAll(".page").forEach(page => page.classList.remove("page--active"));
    const page = document.getElementById("settings-page");
    if (!page) return;
    page.classList.add("page--active");
});


