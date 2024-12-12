export class API {
    constructor() {
        this.apiUrl = 'http://localhost:3000/state';
    }

    async fetchState() {
        const response = await fetch(this.apiUrl);
        return response.ok ? response.json() : null;
    }

    async saveState(state) {
        await fetch(this.apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state)
        });
    }
}
