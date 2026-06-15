import "./styles/style.scss";
import { init, setCurrentTheme, showCurrentPage } from "./ts/pages/start";
import { initSettings } from "./ts/pages/settings";
import { startGame } from "./ts/pages/game";

// Start the app
init();

// Set game settings
document.getElementById("play-btn")?.addEventListener("click", () => {
    showCurrentPage("settings-page");
    setCurrentTheme("settings-theme");    
});

initSettings();

// Stard game
document.getElementById("start-game-btn")?.addEventListener("click", () => {
    showCurrentPage("game-page");
    setCurrentTheme("game-theme");
    startGame(); 
});

// Exit game and return to settings
document.getElementById("exit-game-btn")?.addEventListener("click", () => {
    showCurrentPage("settings-page");
    setCurrentTheme("settings-theme");
   
});
