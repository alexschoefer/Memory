import { gameSettings, GameSettings, Theme } from "./settings";
import { cardSets } from "../cardData";

export function startGame(): void {
    const deck = createDeck(gameSettings);

    renderBoard(deck, gameSettings.boardSize);
}

function createDeck(settings: GameSettings): string[] {
    const allCards = cardSets[settings.theme];
    console.log(allCards);
    
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