import { gameSettings, GameSettings, scores, Theme } from "./settings";

export type Scores = {
    blue: number;
    orange: number;
};

/**
 * Checks whether all card pairs have been matched.
 *
 * @param matchedPairs Number of matched card pairs.
 * @param settings The current game settings.
 * @returns `true` if all pairs have been found; otherwise `false`.
 */
export function isGameOver(matchedPairs: number, settings: GameSettings): boolean {
    return matchedPairs === Number(settings.boardSize) / 2;
}

/**
 * Determines the winner based on the current scores.
 *
 * @param scores The final scores of both players.
 * @returns `"blue"` if the blue player wins, `"orange"` if the orange player wins,
 * or `"draw"` if both players have the same score.
 */
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
 * Displays the game over screen and updates its content
 * based on the winning player.
 *
 * @param winner The winning player or `"draw"` if the game ended in a tie.
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
 * Helper function that updates the background color
 * based on the selected theme.
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