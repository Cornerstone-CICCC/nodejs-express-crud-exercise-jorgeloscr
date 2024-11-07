"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.json()); // Process incoming JSON
app.use((req, res, next) => {
    console.log(`Received request ${req.url} at ${new Date()}`);
    next();
});
let products = [];
app.get("/products", (req, res) => {
    if (products.length === 0) {
        res.status(200).send("<h1>The list it's empty</h1>");
    }
    res.status(200).json(products);
});
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(item => item.id.toString() === id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).send("<h2>Product doesn't exist<h2/>");
    }
});
app.post('/products', (req, res) => {
    const product = {
        id: req.body.id,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice
    };
    products.push(product);
    res.status(201).json(product);
});
app.put("/products/id", (req, res) => {
    const { id } = req.params;
    const foundIndex = products.findIndex(index => index.id.toString() === id);
    if (foundIndex !== -1) {
        const updateProduct = Object.assign(Object.assign({}, products[foundIndex]), { productName: req.body.productName, productDescription: req.body.productDescription, productPrice: req.body.productPrice });
        products[foundIndex] = updateProduct;
        res.json(products);
    }
    else {
        res.status(404).send("TOdo doesn't exist");
    }
    app.delete("/products/id", (req, res) => {
        const { id } = req.params;
        const foundIndex = products.findIndex(product => product.id.toString() === id);
        if (foundIndex !== -1) {
            products = products.filter(product => product.id.toString() !== id);
            res.status(200).send("Product was deleted");
        }
        else {
            res.status(404).send("Product doesn't exist");
        }
    });
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log('Server Started');
});
