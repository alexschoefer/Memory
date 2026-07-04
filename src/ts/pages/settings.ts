import { cardSets } from "../cardData";

export type Theme = keyof typeof cardSets;
type Player = "blue" | "orange";
type BoardSize = 16 | 24 | 36;

export type GameSettings = {
    theme: Theme;
    player: Player;
    boardSize: BoardSize;
};

export const gameSettings: GameSettings = {
    theme: "coding",
    player: "blue",
    boardSize: 16,
};

export const scores = {
    blue: 0,
    orange: 0,
};

/**
 * 
 */

export function initSettings(): void {
    initThemeSelection();
    initBoardSizeSelection();
    initPlayerSelection();
    loadSavedTheme();
    updateSettingsPreview();
}

/* ---------------------------
   Preview Rendering
---------------------------- */

function setPreview(theme: Theme): void {
    const themeVisual = document.getElementById("theme_visual");

    if (!themeVisual) return;

    themeVisual.className = "settings__theme_visual";
    themeVisual.classList.add(`settings__theme_visual--${theme}`);
}

/* ---------------------------
   LocalStorage
---------------------------- */

function loadSavedTheme(): void {
    const savedTheme = localStorage.getItem("gameTheme");

    if (savedTheme && isTheme(savedTheme)) {
        gameSettings.theme = savedTheme;
    }

    setPreview(gameSettings.theme);
}

function handleThemeChange(theme: Theme): void {
    gameSettings.theme = theme;

    setPreview(theme);
    updateSettingsPreview();
    localStorage.setItem("gameTheme", theme);
}

/* ---------------------------
   Event Binding
---------------------------- */

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
            }
        });
    });
}

/* ---------------------------
   Type Guard
---------------------------- */

function isTheme(value: string): value is Theme {
    return (
        value === "coding" ||
        value === "gaming" ||
        value === "projects" ||
        value === "food"
    );
}

function initBoardSizeSelection(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>(
        'input[name="board-size"]'
    );

    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            const value = Number(input.value) as BoardSize;
            gameSettings.boardSize = value;
            updateSettingsPreview();
        });
    });
}

function initPlayerSelection(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>(
        'input[name="player"]'
    );

    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            gameSettings.player = input.value as Player;
            updateSettingsPreview();
        });
    });
}

function updateSettingsPreview(): void {
    const theme = document.getElementById("selected-theme");
    const player = document.getElementById("selected-player");
    const boardSize = document.getElementById("selected-board-size");

    if (!theme || !player || !boardSize) return;

    theme.textContent = gameSettings.theme;
    player.textContent = gameSettings.player;
    boardSize.textContent = `${gameSettings.boardSize} cards`;
}