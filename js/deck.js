export class Deck {
    constructor() {
        this.cards = [];
        this.deckContainer = document.getElementById("deck-container");
        this.suitContainers = document.querySelectorAll("[data-suit]");
    }

    init() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        for (let suit of suits) {
            for (let i = 1; i <= 13; i++) {
                const card = document.createElement("div");
                card.classList.add("card");
                card.draggable = true;
                card.dataset.suit = suit;
                card.dataset.value = i;
                card.innerText = `${i} of ${suit}`;
                this.cards.push(card);
                this.deckContainer.appendChild(card);
            }
        }
    }

    enableDragAndDrop(onDropCallback) {
        this.cards.forEach((card) => {
            card.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", JSON.stringify({
                    suit: card.dataset.suit,
                    value: card.dataset.value
                }));
            });
        });

        this.suitContainers.forEach((container) => {
            container.addEventListener("dragover", (e) => e.preventDefault());
            container.addEventListener("drop", (e) => {
                e.preventDefault();
                const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                if (container.dataset.suit === data.suit) {
                    container.appendChild(document.querySelector(`[data-suit="${data.suit}"][data-value="${data.value}"]`));
                    onDropCallback(data, container);
                }
            });
        });
    }

    getState() {
        return this.suitContainers.map(container => ({
            suit: container.dataset.suit,
            cards: Array.from(container.children).map(card => ({
                suit: card.dataset.suit,
                value: card.dataset.value
            }))
        }));
    }

    loadState(state) {
        state.forEach((suitGroup) => {
            const container = document.querySelector(`[data-suit="${suitGroup.suit}"]`);
            suitGroup.cards.forEach(cardData => {
                const card = document.querySelector(`[data-suit="${cardData.suit}"][data-value="${cardData.value}"]`);
                container.appendChild(card);
            });
        });
    }
}
