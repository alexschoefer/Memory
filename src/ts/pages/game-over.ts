import { GameSettings } from "./settings";

export type Scores = {
    blue: number;
    orange: number;
}

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

export function showGameOverScreen(
    winner: "blue" | "orange" | "draw"
): void {
    // Overlay anzeigen
}