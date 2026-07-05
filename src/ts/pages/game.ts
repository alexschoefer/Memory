import { gameSettings, GameSettings, Theme, scores } from "./settings";
import { isGameOver, getWinner, showGameOverScreen } from "./game-over";
import { cardSets } from "../cardData";


let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let lockBoard = false;
let currentPlayer: "blue" | "orange" = gameSettings.player as "blue" | "orange";
let matchedPairs = 0;

export function startGame(): void {
    const deck = createDeck(gameSettings);
    renderBoard(deck, gameSettings.boardSize);
    initCardEvents();
    showCurrentPlayer(gameSettings.theme, gameSettings.player);
    showScoreBoard(gameSettings.theme)
}

function createDeck(settings: GameSettings): string[] {
    const allCards = cardSets[settings.theme as keyof typeof cardSets];

    const selected = allCards.card.slice(0, Number(settings.boardSize) / 2);

    return shuffle([...selected, ...selected]);
}

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

function shuffle<T>(array: T[]): T[] {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}


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

function initCardEvents(): void {
    const board = document.querySelector<HTMLElement>(".game-cards");
    if (!board) return;
    board.addEventListener("click", handleCardClick);
}

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

function resetCards(): void {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

export function resetGame(): void {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;
    scores.blue = 0;
    scores.orange = 0;
}

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

function switchPlayer(theme: GameSettings["theme"], player: GameSettings["player"]): void {
    gameSettings.player =
        gameSettings.player === "blue" ? "orange" : "blue";

    showCurrentPlayer(theme, gameSettings.player);
}

function showScoreBoard(theme: GameSettings["theme"]) {
    if (!theme) return;
    const scoreBoardImgBlue = document.querySelector<HTMLImageElement>(".current-scoreBoardPlayerBlue-img");
    const scoreBoardImgOrange = document.querySelector<HTMLImageElement>(".current-scoreBoardPlayerOrange-img");

    console.log(gameSettings.theme);
    
    if (!scoreBoardImgBlue || !scoreBoardImgOrange) return;

    if (theme === 'coding') {
        scoreBoardImgBlue.src = "./public/assets/img/game/playerLabel_blue.png";
        scoreBoardImgOrange.src = "./public/assets/img/game/playerLabel_orange.png";
    }else if (theme === 'gaming' || 'food' || 'projects') {
        scoreBoardImgBlue.src = "./public/assets/img/game/chess_blue_pawn.png";
        scoreBoardImgOrange.src = "./public/assets/img/game/chess_orange_pawn.png";
    }else {
        return;
    }

    console.log(scoreBoardImgBlue.src);
    
}

function updateScoreboard(player: "blue" | "orange"): void {
    scores[player]++;
    const scoreElement = document.getElementById(`score-${player}`);
    if (!scoreElement) return;
    scoreElement.textContent = String(scores[player]);
}

function endGame(): void {
    showFinalScore();

    const winner = getWinner(scores);

    setTimeout(() => {
        showGameOverScreen(winner);
    }, 3000);
}

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

function showFinalScoreBackground(theme: Theme): void {
    if(theme === 'food') {
        document.body.style.backgroundColor = "#F3832D";
    }else if(theme === 'projects') {
        document.body.style.backgroundColor = "#1E7594";
    }else {
        return;
    }
}