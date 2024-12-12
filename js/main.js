import { Deck } from './modules/deck.js';
import { API } from './modules/api.js';

document.addEventListener("DOMContentLoaded", () => {
    const deck = new Deck();
    const api = new API();

    // Inicializar baraja y cargar estado
    deck.init();
    api.fetchState().then((state) => {
        if (state) deck.loadState(state);
    });

    // Eventos de arrastrar y soltar
    deck.enableDragAndDrop((card, target) => {
        api.saveState(deck.getState());
    });
});
