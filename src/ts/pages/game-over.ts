import { GameSettings, scores } from "./settings";

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

export function showGameOverScreen(winner: "blue" | "orange" | "draw"): void {

    document
        .querySelectorAll(".page")
        .forEach(page => page.classList.remove("page--active"));

    const page = document.getElementById("game_over");

    if (!page) return;

    page.classList.add("page--active");

    const winnerText = page.querySelector(
        ".game-over__winner"
    ) as HTMLElement;

    const winnerPlayer = page.querySelector(
        ".game-over__endscreen p span"
    ) as HTMLElement;

    const winnerImage = page.querySelector(
        ".game-over__winner_img"
    ) as HTMLElement;

    if (!winnerText || !winnerPlayer || !winnerImage) return;

    if (winner === "blue") {
        winnerText.textContent = "The winner is";
        winnerPlayer.textContent = "Blue";
        winnerImage.className =
            "game-over__winner_img winner-blue";
    }

    else if (winner === "orange") {
        winnerText.textContent = "The winner is";
        winnerPlayer.textContent = "Orange";
        winnerImage.className =
            "game-over__winner_img winner-orange";
    }

    else {
        winnerText.textContent = "It's a draw!";
        winnerPlayer.textContent = "";
        winnerImage.className =
            "game-over__winner_img winner-draw";
    }
}