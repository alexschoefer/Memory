import "./styles/style.scss";
import { init, setCurrentTheme, showCurrentPage } from "./ts/pages/start";
import { initSettings } from "./ts/pages/settings";

// Start the app
init();

// Set game settings
document.getElementById("play-btn")?.addEventListener("click", () => {
    showCurrentPage("settings-page");
    setCurrentTheme("settings-theme");    
});

initSettings();