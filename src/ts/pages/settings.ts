import { cardSets } from "../cardData";

export type Theme = "Theme" | "coding" | "gaming" | "projects" | "food";
type Player = "Player" | "blue" | "orange";
type BoardSize = "Size" | 16 | 24 | 36;

export type GameSettings = {
    theme: Theme;
    player: Player;
    boardSize: BoardSize;
};

export const gameSettings: GameSettings = {
    theme: "Theme",
    player: "Player",
    boardSize: "Size",
};

export const scores = {
    blue: 0,
    orange: 0,
};

/**
 * Initializes all settings controls, restores saved data
 * and updates the settings preview.
 */
export function initSettings(): void {
    initThemeSelection();
    initBoardSizeSelection();
    initPlayerSelection();
    loadSavedTheme();
    updateSettingsPreview();
    readyToStartTheGame();
}


/**
 * Updates the theme preview shown in the settings page.
 *
 * @param theme The theme to display in the preview.
 */
function setPreview(theme: Theme): void {
    const themeVisual = document.getElementById("theme_visual");

    if (!themeVisual) return;

    themeVisual.className = "settings__theme_visual";
    themeVisual.classList.add(`settings__theme_visual--${theme}`);
}


/**
 * Loads the previously selected theme from LocalStorage
 * and updates the preview if a valid theme is found.
 */
function loadSavedTheme(): void {
    const savedTheme = localStorage.getItem("gameTheme");

    if (savedTheme && isTheme(savedTheme)) {
        gameSettings.theme = savedTheme;
    }

    setPreview(gameSettings.theme);
}


/**
 * Applies the selected theme, updates the preview
 * and stores the selection in LocalStorage.
 *
 * @param theme The selected game theme.
 */
function handleThemeChange(theme: Theme): void {
    gameSettings.theme = theme;

    setPreview(theme);
    updateSettingsPreview();
    localStorage.setItem("gameTheme", theme);
}

/**
 * Registers all event listeners for the theme selection.
 * This includes hover previews and theme selection changes.
 */
function initThemeSelection(): void {
    const themeInputs = document.querySelectorAll<HTMLInputElement>(
        'input[name="theme"]'
    );

    themeInputs.forEach((input) => {
        const label = input.closest("label");

        if (!label) return;

        // Hover preview
        label.addEventListener("mouseenter", () => {
            const theme = input.dataset.theme;

            if (theme && isTheme(theme)) {
                setPreview(theme);
            }
        });

        // Back to selected theme
        label.addEventListener("mouseleave", () => {
            setPreview(gameSettings.theme);
        });

        // Selection change
        input.addEventListener("change", () => {
            const theme = input.dataset.theme;

            if (theme && isTheme(theme)) {
                handleThemeChange(theme);
                readyToStartTheGame();
            }
        });
    });
}

/**
 * Checks whether the provided string is a valid game theme.
 *
 * @param value The value to validate.
 * @returns `true` if the value is a supported theme.
 */
function isTheme(value: string): value is Theme {
    return (
        value === "coding" ||
        value === "gaming" ||
        value === "projects" ||
        value === "food"
    );
}

/**
 * Registers the event listeners for the board size selection.
 */
function initBoardSizeSelection(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>(
        'input[name="board-size"]'
    );

    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            const value = Number(input.value) as BoardSize;
            gameSettings.boardSize = value;
            updateSettingsPreview();
            readyToStartTheGame();
        });
    });
}

/**
 * Registers the event listeners for the player selection.
 */
function initPlayerSelection(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>(
        'input[name="player"]'
    );

    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            gameSettings.player = input.value as Player;
            updateSettingsPreview();
            readyToStartTheGame();
        });
    });
}

/**
 * Updates the settings summary with the currently
 * selected theme, player and board size.
 */
function updateSettingsPreview(): void {
    const theme = document.getElementById("selected-theme");
    const player = document.getElementById("selected-player");
    const boardSize = document.getElementById("selected-board-size");

    if (!theme || !player || !boardSize) return;

    theme.textContent = gameSettings.theme;
    player.textContent = gameSettings.player;
    boardSize.textContent = `${gameSettings.boardSize} cards`;
}

/**
 * Enables the start button only after the user has selected
 * a theme, a player and a board size.
 */
function readyToStartTheGame(): void {
    const startButton = document.getElementById("start-game-btn") as HTMLButtonElement;

    if (!startButton) return;

    const themeSelected = document.querySelector(
        'input[name="theme"]:checked'
    );

    const playerSelected = document.querySelector(
        'input[name="player"]:checked'
    );

    const boardSizeSelected = document.querySelector(
        'input[name="board-size"]:checked'
    );

    startButton.disabled = !(
        themeSelected &&
        playerSelected &&
        boardSizeSelected
    );
}