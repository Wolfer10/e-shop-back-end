import { Router } from 'express';
import ProductService from '../service/productService.js';

const router = Router()

router.get("/", async (req, res) => {
    const products = await ProductService.readAll();
    res.send(products);
})


router.get("/:id", async (req, res) => {
    const product = await ProductService.readById(req.params.id);
    res.send(product);
     
})

router.post("/", async (req, res) => {
    const product = await ProductService.create(req.body);
    res.send(product);
})

router.put("/:id", async (req, res) => {
    const product = await ProductService.update(req.params.id, req.body);
    console.log(product);
    res.send(product);
})


router.delete("/:id", async (req, res) => {
    await ProductService.delete(req.params.id);
    res.status(200).send();
})

export default router