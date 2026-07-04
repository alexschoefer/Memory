import { gameSettings, GameSettings, scores, Theme } from "./settings";

export type Scores = {
    blue: number;
    orange: number;
};

export function isGameOver(matchedPairs: number, settings: GameSettings): boolean {
    return matchedPairs === settings.boardSize / 2;
}

export function getWinner(scores: Scores): "blue" | "orange" | "draw" {
    if (scores.blue > scores.orange) {
        return "blue";
    }

    if (scores.orange > scores.blue) {
        return "orange";
    }

    return "draw";
}


/**
 * 
 * @param winner 
 * @returns 
 */
export function showGameOverScreen(winner: "blue" | "orange" | "draw"): void {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("page--active"));
    const page = document.getElementById("game_over");
    if (!page) return;
    page.classList.add("page--active");
    switchGameOverBackground(gameSettings.theme);
    const winnerText = page.querySelector(".game-over__winner") as HTMLElement;
    const winnerPlayer = page.querySelector(".game-over__endscreen p span") as HTMLElement;
    const winnerImage = page.querySelector(".game-over__winner_img") as HTMLElement;

    if (!winnerText || !winnerPlayer || !winnerImage) return;

    if (winner === "blue") {
        winnerText.textContent = "The winner is";
        winnerPlayer.textContent = "Blue Player";
        winnerPlayer.className = "game-over__winner_blue";
        winnerImage.className = "game-over__winner_img winner-blue";
    }

    else if (winner === "orange") {
        winnerText.textContent = "The winner is";
        winnerPlayer.textContent = "Orange Player";
        winnerPlayer.className = "game-over__winner_orange";
        winnerImage.className = "game-over__winner_img winner-orange";
    }

    else {
        winnerText.textContent = "It's a";
        winnerPlayer.textContent = "DRAW";
        winnerPlayer.className = "game-over__winner_draw";
        winnerImage.className = "game-over__winner_img winner-draw";
    }
}


/**
 * Help function to switch the background color with the selected them.
 * 
 * @param theme 
 * @returns 
 */
function switchGameOverBackground(theme: Theme) {
    if (theme === 'food') {
        document.body.style.backgroundColor = "#F6F6F6";
    } else if (theme === 'projects') {
        document.body.style.backgroundColor = "#1E7594";
    } else {
        return
    }
}