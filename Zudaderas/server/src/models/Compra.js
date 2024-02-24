import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ItemCompraSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: "Sudadera" }, // Referencia al ítem (sudadera) comprado
    cantidad: { type: Number, default: 1 }, // Cantidad comprada del ítem
});

const CompraSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Campo que almacena el ID del usuario
        nombreUsuario: { type: String, required: true }, // Nombre del usuario para visualización
        items: [ItemCompraSchema], // Array de ítems comprados
        precioTotal: { type: Number, default: 0 }, // Precio total de la compra
    },
    { timestamps: true }
);

export default model("Compra", CompraSchema);
