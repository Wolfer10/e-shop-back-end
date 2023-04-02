import { Router } from 'express';
import UserService from '../service/userService.js';
import ProductService from '../service/productService.js';

const router = Router()

router.get("/", async (req, res) => {
    const users = await UserService.readAll();
    res.send(users);
})

router.get("/products", async (req, res) => {
    const products = await ProductService.readAll();
    res.send(products);
})


router.get("/:id", async (req, res) => {
    const user = await UserService.readById(req.params.id);
    res.send(user);
     
})

router.post("/", async (req, res) => {
    const user = await UserService.create(req.body);
    res.send(user);
})

router.put("/:id", async (req, res) => {
    const user = await UserService.update(req.params.id, req.body);
    console.log(user);
    res.send(user);
})


router.delete("/:id", async (req, res) => {
    await UserService.delete(req.params.id);
    res.status(200).send();
})

export default router