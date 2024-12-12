export class API {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    async fetchState() {
        try {
            const response = await fetch(`${this.baseUrl}/state`);
            if (!response.ok) throw new Error('Error al obtener el estado');
            return await response.json();
        } catch (error) {
            console.error('Error al obtener el estado:', error);
            return null;
        }
    }

    async saveState(state) {
        try {
            const response = await fetch(`${this.baseUrl}/state`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            });
            if (!response.ok) throw new Error('Error al guardar el estado');
            return await response.json();
        } catch (error) {
            console.error('Error al guardar el estado:', error);
            return null;
        }
    }
}