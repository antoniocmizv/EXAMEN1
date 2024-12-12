const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Estado inicial de las cartas
let state = {
    cards: [] // Aquí se almacenará la posición actual de las cartas
};

// Ruta para obtener el estado actual
app.get("/state", (req, res) => {
    if (!state.cards || state.cards.length === 0) {
        state = {
            cards: [] // Asegúrate de que cards esté siempre definido
        };
    }
    res.json(state);
});

// Ruta para guardar el estado actual
app.post("/state", (req, res) => {
    state = req.body; // Guardar el nuevo estado
    res.status(200).json({ message: "Estado guardado correctamente" });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
