import "./styles/style.scss";
import { init, setCurrentTheme, showCurrentPage } from "./ts/pages/start";
import { gameSettings, initSettings } from "./ts/pages/settings";
import { startGame, resetGame } from "./ts/pages/game";

// Initialize application
init();
initSettings();

const exitOverlay = document.getElementById("game-exit-overlay");

// Open settings page
document.getElementById("play-btn")?.addEventListener("click", () => {
    navigate("settings-page", "settings-theme");
});

// Start game
document.getElementById("start-game-btn")?.addEventListener("click", () => {
    navigate("game-page", `${gameSettings.theme}-theme`);
    startGame();
});

// Return to start page after game over
document.getElementById("go_back_btn")?.addEventListener("click", () => {
    navigate("start-page", "start-theme");
    resetGame();
});

// Exit game overlay
document.getElementById("exit-game-btn")?.addEventListener("click", showExitOverlay);
document.getElementById("back_game")?.addEventListener("click", closeExitOverlay);
document.getElementById("quit_game")?.addEventListener("click", goBackToSettings);

/**
 * Navigates to the specified page and applies the corresponding theme.
 *
 * @param page The id of the page to display.
 * @param theme The theme to apply to the application.
 */
function navigate(page: string, theme: string): void {
    showCurrentPage(page);
    setCurrentTheme(theme);
}

/**
 * Displays the exit confirmation overlay and prevents
 * scrolling in the background.
 */
function showExitOverlay(): void {
    if (!exitOverlay) return;

    exitOverlay.classList.add("game-exit-overlay__container--active");
    document.body.classList.add("no-scroll");
}

/**
 * Hides the exit confirmation overlay and restores
 * page scrolling.
 */
function closeExitOverlay(): void {
    if (!exitOverlay) return;

    exitOverlay.classList.remove("game-exit-overlay__container--active");
    document.body.classList.remove("no-scroll");
}

/**
 * Returns to the settings page, closes the exit overlay
 * and resets the current game.
 */
function goBackToSettings(): void {
    navigate("settings-page", "settings-theme");
    closeExitOverlay();
    resetGame();
}