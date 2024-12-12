export class Deck {
    constructor() {
        this.cards = [];
        this.deckContainer = document.getElementById("deck-container");
        this.suitContainers = document.querySelectorAll("[data-suit]");
    }

    init() {
        const suits = ['corazones', 'diamantes', 'tréboles', 'picas'];
        const symbols = { corazones: '♥', diamantes: '♦', tréboles: '♣', picas: '♠' };
    
        for (let suit of suits) {
            for (let i = 1; i <= 13; i++) {
                const card = document.createElement("div");
                card.classList.add("card");
                card.draggable = true;
                card.dataset.suit = suit;
                card.dataset.value = this.getCardValue(i);
                card.dataset.id = `${suit}-${i}`; // Asegúrate de asignar un ID único
                card.style.position = 'relative'; // Asegura posición relativa
                card.innerHTML = `
                    <div style="font-size: 14px; position: absolute; top: 5px; left: 5px;">
                        ${this.getCardValue(i)} ${symbols[suit]}
                    </div>
                    <div style="font-size: 36px; text-align: center; color: ${suit === 'corazones' || suit === 'diamantes' ? 'red' : 'black'};">
                        ${symbols[suit]}
                    </div>
                `;
                this.cards.push(card);
                this.deckContainer.appendChild(card);
            }
        }
    }
    

    enableDragAndDrop(onDropCallback) {
        // Configura el evento dragstart en todas las cartas
        this.cards.forEach((card) => {
            card.addEventListener("dragstart", (e) => {
                if (card.dataset.id && card.dataset.suit && card.dataset.value) {
                    const transferData = {
                        id: card.dataset.id,
                        suit: card.dataset.suit,
                        value: card.dataset.value
                    };
                    console.log("Datos configurados en dragstart:", transferData); // Depuración
                    e.dataTransfer.setData("text/plain", JSON.stringify(transferData));
                    e.dataTransfer.effectAllowed = "move";
                } else {
                    console.error("Datos de la carta no válidos en dragstart:", card);
                }
            });
        });
        
        
    
        // Configura el evento drop en los contenedores de los palos
        this.suitContainers.forEach((container) => {
            container.addEventListener("dragover", (e) => e.preventDefault());
            container.addEventListener("drop", (e) => {
                e.preventDefault();
                const rawData = e.dataTransfer.getData("text/plain");
                if (rawData) { // Verifica si hay datos antes de analizar
                    try {
                        const data = JSON.parse(rawData);
                        const card = document.querySelector(`[data-id="${data.id}"]`);
                        if (card && !container.contains(card)) {
                            container.appendChild(card);
                            card.style.position = 'relative';
                            card.style.left = '';
                            card.style.top = '';
                            onDropCallback(data, container);
                        }
                    } catch (error) {
                        console.error("Error al analizar los datos del drop:", error);
                    }
                } else {
                    console.error("No se recibieron datos en el evento drop");
                }
            });
            
        });
    
        // Configura el evento drop en el mazo (deckContainer)
        this.deckContainer.addEventListener("dragover", (e) => e.preventDefault());
        this.deckContainer.addEventListener("drop", (e) => {
            e.preventDefault();
            const rawData = e.dataTransfer.getData("text/plain");
            console.log("Datos recibidos en drop:", rawData); // Depuración
            if (rawData) {
                try {
                    const data = JSON.parse(rawData);
                    console.log("Datos analizados en drop:", data); // Depuración
                    const card = document.querySelector(`[data-id="${data.id}"]`);
                    if (card && !this.deckContainer.contains(card)) {
                        this.deckContainer.appendChild(card);
                        card.style.position = 'relative';
                        card.style.left = '';
                        card.style.top = '';
                    }
                } catch (error) {
                    console.error("Error al analizar los datos del drop:", error);
                }
            } else {
                console.error("No se recibieron datos en el evento drop");
            }
        });
        
        
        
        
    }
    

    getCardValue(num) {
        if (num === 1) return 'A';
        if (num === 11) return 'J';
        if (num === 12) return 'Q';
        if (num === 13) return 'K';
        return num.toString();
    }

    getState() {
        const state = [];
        this.suitContainers.forEach(container => {
            Array.from(container.children).forEach(card => {
                state.push({
                    id: card.dataset.id,
                    suit: card.dataset.suit,
                    value: card.dataset.value,
                    container: container.dataset.suit
                });
            });
        });
    
        this.deckContainer.querySelectorAll(".card").forEach(card => {
            state.push({
                id: card.dataset.id,
                suit: card.dataset.suit,
                value: card.dataset.value,
                container: "deck"
            });
        });
    
        return { cards: state };
    }
    
    loadState(state) {
        this.deckContainer.innerHTML = "";
        this.suitContainers.forEach(container => container.innerHTML = "");
    
        state.cards.forEach(cardState => {
            const card = this.cards.find(c => c.dataset.id === cardState.id);
            if (card) {
                const container = cardState.container === "deck"
                    ? this.deckContainer
                    : document.querySelector(`[data-suit="${cardState.container}"]`);
    
                // Agregar la carta al contenedor si aún no está
                if (!container.contains(card)) {
                    container.appendChild(card);
                }
            } else {
                console.error("Carta no encontrada para el estado:", cardState);
            }
        });
    }
    
    
}