import { gameSettings, GameSettings, Theme, scores } from "./settings";
import { isGameOver } from "./game-over";
import { cardSets } from "../cardData";


let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let lockBoard = false;
let currentPlayer: GameSettings["player"] = gameSettings.player;
let matchedPairs = 0;

export function startGame(): void {
    const deck = createDeck(gameSettings);
    renderBoard(deck, gameSettings.boardSize);
    initCardEvents();
    showCurrentPlayer(gameSettings.theme, gameSettings.player);
    showScoreBoard(gameSettings.theme)
}

function createDeck(settings: GameSettings): string[] {
    const allCards = cardSets[settings.theme];

    const selected = allCards.card.slice(0, settings.boardSize / 2);

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
    back.style.backgroundImage = `url(${cardSets[theme].back})`;

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
        updateScoreboard(gameSettings.player);
        resetCards();
        console.log(matchedPairs);
        isGameOver(matchedPairs, gameSettings);
        return;
    }

    switchPlayer(gameSettings.theme, gameSettings.player);
    showCurrentPlayer(gameSettings.theme, gameSettings.player);
    console.log(`Current player: ${gameSettings.player}`);

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

function resetGame(): void {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function showCurrentPlayer(theme: GameSettings["theme"], player: GameSettings["player"]): void {
    if (!player) return;
    if (!theme) return;

    const playerImg = document.querySelector<HTMLImageElement>(".game-header__current-player-img");

    if (!playerImg) return;

    if (player === "blue") {
        playerImg.src = cardSets[theme].player.playerBlue;
    }

    if (player === "orange") {
        playerImg.src = cardSets[theme].player.playerOrange;
    }

}

function switchPlayer(theme: GameSettings["theme"], player: GameSettings["player"]): void {
    gameSettings.player =
        gameSettings.player === "blue"
            ? "orange"
            : "blue";
}

function showScoreBoard(theme: GameSettings["theme"]) {
    if (!theme) return;
    const scoreBoardImgBlue = document.querySelector<HTMLImageElement>(".current-scoreBoardPlayerBlue-img");
    const scoreBoardImgOrange = document.querySelector<HTMLImageElement>(".current-scoreBoardPlayerOrange-img");

    if(!scoreBoardImgBlue || !scoreBoardImgOrange) return;

    if(theme === 'coding') {
        scoreBoardImgBlue.src = "./public/assets/img/game/playerLabel_blue.png";
        scoreBoardImgOrange.src = "./public/assets/img/game/playerLabel_orange.png";
    }
}

function updateScoreboard(player: GameSettings["player"]): void {
    scores[player]++;

    const scoreElement = document.getElementById(
        `score-${player}`
    );

    if (!scoreElement) return;

    scoreElement.textContent = String(scores[player]);
}