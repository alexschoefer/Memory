import { gameSettings, GameSettings, Theme, scores } from "./settings";
import { isGameOver, getWinner, showGameOverScreen } from "./game-over";
import { cardSets } from "../cardData";


let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let lockBoard = false;
let matchedPairs = 0;

/**
 * Starts a new game by creating the deck, rendering the game board,
 * initializing all card interactions and updating the player UI.
 */
export function startGame(): void {
    const deck = createDeck(gameSettings);
    renderBoard(deck, gameSettings.boardSize);
    initCardEvents();
    showCurrentPlayer(gameSettings.theme, gameSettings.player);
    showScoreBoard(gameSettings.theme)
}

/**
 * Creates a shuffled deck based on the selected game settings.
 * The deck contains matching pairs for the chosen board size.
 *
 * @param settings The current game settings.
 * @returns A shuffled array containing all card image paths.
 */
function createDeck(settings: GameSettings): string[] {
    const allCards = cardSets[settings.theme as keyof typeof cardSets];

    const selected = allCards.card.slice(0, Number(settings.boardSize) / 2);

    return shuffle([...selected, ...selected]);
}

/**
 * Renders the game board with the given cards.
 *
 * @param cards The shuffled deck to display.
 * @param size The selected board size.
 */
function renderBoard(cards: string[], size: GameSettings["boardSize"]): void {
    const board = document.querySelector<HTMLElement>(".game-cards");
    if (!board) return;

    board.innerHTML = "";
    board.dataset.size = String(size);

    cards.forEach((img) => {
        const card = createCard(img, gameSettings.theme);
        board.appendChild(card);
    });
}

/**
 * Returns a shuffled copy of the provided array using
 * the Fisher-Yates shuffle algorithm.
 *
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
function shuffle<T>(array: T[]): T[] {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

/**
 * Creates a single card element from the HTML template
 * and assigns the corresponding front and back images.
 *
 * @param imagePath The image displayed on the front side.
 * @param theme The currently selected game theme.
 * @returns The generated card element.
 */
function createCard(imagePath: string, theme: Theme): HTMLElement {
    const template = document.getElementById("card-template") as HTMLTemplateElement;

    const card = template.content.firstElementChild!.cloneNode(true) as HTMLElement;

    const front = card.querySelector(".card__face--front") as HTMLElement;
    const back = card.querySelector(".card__face--back") as HTMLElement;

    front.style.backgroundImage = `url(${imagePath})`;
    back.style.backgroundImage = `url(${cardSets[theme as keyof typeof cardSets].back})`;

    card.dataset.image = imagePath;

    return card;
}

/**
 * Registers the click event listener for the game board.
 */
function initCardEvents(): void {
    const board = document.querySelector<HTMLElement>(".game-cards");
    if (!board) return;
    board.addEventListener("click", handleCardClick);
}

/**
 * Handles card selection and manages the current turn.
 *
 * @param event The click event triggered on the game board.
 */

function handleCardClick(event: Event): void {
    if (lockBoard) return;
    const target = event.target as HTMLElement;
    const card = target.closest(".card") as HTMLElement | null;

    if (!card) return;

    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkForMatch();

}

/**
 * Compares the two selected cards, updates the score,
 * switches the active player if necessary and checks
 * whether the game has ended.
 */
function checkForMatch(): void {
    if (!firstCard || !secondCard) return;
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;
        updateScoreboard(gameSettings.player as "blue" | "orange");
        resetCards();
        if (isGameOver(matchedPairs, gameSettings)) {
            endGame();
            return;
        }
        return;
    }

    switchPlayer(gameSettings.theme, gameSettings.player);
    showCurrentPlayer(gameSettings.theme, gameSettings.player);

    lockBoard = true;

    setTimeout(() => {
        firstCard?.classList.remove("flipped");
        secondCard?.classList.remove("flipped");
        resetCards();
    }, 1000);
}

/**
 * Resets the currently selected cards and unlocks the board
 * for the next turn.
 */
function resetCards(): void {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

/**
 * Resets the complete game state so a new game can be started.
 */
export function resetGame(): void {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    scores.blue = 0;
    scores.orange = 0;
    renderScoreboard();
}

function renderScoreboard(): void {
    const blue = document.getElementById("score-blue");
    const orange = document.getElementById("score-orange");

    if (blue) {
        blue.textContent = String(scores.blue);
    }

    if (orange) {
        orange.textContent = String(scores.orange);
    }
}

/**
 * Updates the current player indicator in the game header.
 *
 * @param theme The active game theme.
 * @param player The player whose turn it is.
 */
function showCurrentPlayer(theme: GameSettings["theme"], player: GameSettings["player"]): void {
    const playerImg = document.querySelector<HTMLImageElement>(".game-header__current-player-img");
    if (!playerImg) return;
    playerImg.src =
        player === "blue"
            ? cardSets[theme as keyof typeof cardSets].player.playerBlue
            : cardSets[theme as keyof typeof cardSets].player.playerOrange;

    playerImg.classList.remove("activePlayerBlue", "activePlayerOrange");

    playerImg.classList.add(player === "blue"
        ? "activePlayerBlue"
        : "activePlayerOrange"
    );
}

/**
 * Switches the active player and updates the player indicator.
 *
 * @param theme The active game theme.
 * @param player The current player before switching.
 */
function switchPlayer(theme: GameSettings["theme"], player: GameSettings["player"]): void {
    gameSettings.player =
        gameSettings.player === "blue" ? "orange" : "blue";

    showCurrentPlayer(theme, gameSettings.player);
}

/**
 * Updates the scoreboard icons according to the selected theme.
 *
 * @param theme The active game theme.
 */
function showScoreBoard(theme: GameSettings["theme"]): void {
    const scoreBoardImgBlue = document.querySelector<HTMLImageElement>(
        ".current-scoreBoardPlayerBlue-img"
    );

    const scoreBoardImgOrange = document.querySelector<HTMLImageElement>(
        ".current-scoreBoardPlayerOrange-img"
    );

    if (!scoreBoardImgBlue || !scoreBoardImgOrange) return;

    if (theme === "coding") {
        scoreBoardImgBlue.src = "./public/assets/img/game/playerLabel_blue.png";
        scoreBoardImgOrange.src = "./public/assets/img/game/playerLabel_orange.png";
    } else {
        scoreBoardImgBlue.src = "./public/assets/img/game/chess_blue_pawn.png";
        scoreBoardImgOrange.src = "./public/assets/img/game/chess_orange_pawn.png";
    }
}

/**
 * Increases the score of the given player and updates
 * the scoreboard UI.
 *
 * @param player The player who found a matching pair.
 */
function updateScoreboard(player: "blue" | "orange"): void {
    scores[player]++;
    const scoreElement = document.getElementById(`score-${player}`);
    if (!scoreElement) return;
    scoreElement.textContent = String(scores[player]);
    renderScoreboard();
}

/**
 * Displays the final score and transitions
 * to the game over screen.
 */
function endGame(): void {
    showFinalScore();

    const winner = getWinner(scores);

    setTimeout(() => {
        showGameOverScreen(winner);
    }, 3000);
}

/**
 * Displays the final score screen and updates
 * both players' scores.
 */
function showFinalScore(): void {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("page--active"));
    document.getElementById("score")?.classList.add("page--active");
    showFinalScoreBackground(gameSettings.theme);
    const blueScore = document.getElementById("final-score-blue");
    const orangeScore = document.getElementById("final-score-orange");

    if (blueScore) {
        blueScore.textContent = String(scores.blue);
    }

    if (orangeScore) {
        orangeScore.textContent = String(scores.orange);
    }
}

/**
 * Updates the background color of the final score screen
 * based on the selected game theme.
 *
 * @param theme The active game theme.
 */
function showFinalScoreBackground(theme: Theme): void {
    if(theme === 'food') {
        document.body.style.backgroundColor = "#F3832D";
    }else if(theme === 'projects') {
        document.body.style.backgroundColor = "#1E7594";
    }else {
        return;
    }
}