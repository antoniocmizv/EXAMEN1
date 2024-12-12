import { Deck } from './modules/deck.js';
import { API } from './modules/api.js';

document.addEventListener("DOMContentLoaded", () => {
    const deck = new Deck();
    const api = new API();

    // Cargar el estado desde el servidor
    api.fetchState().then((state) => {
        if (state && state.cards && state.cards.length > 0) {
            // Si hay un estado guardado, cargarlo
            deck.loadState(state);
        } else {
            // Si no hay estado guardado, inicializar un nuevo mazo
            deck.init();
        }
    });

    // Configurar eventos de arrastrar y soltar
    deck.enableDragAndDrop((data, container) => {
        api.saveState(deck.getState());
    });
});
