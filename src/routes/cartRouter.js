import { Router } from "express";
import cartModel from "../models/cart.js";


const cartRouter = Router()

cartRouter.post('/', async (req, res) => {
    try {
        const mensaje = await cartModel.create({ products: [] })
        res.status(201).send(mensaje)
    } catch (e) {
        res.status(500).send(`Error interno del servidor al crear carrito: ${error}`)
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({ _id: cartId }).populate("products.id_prod")
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

cartRouter.post('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body
        
        if (quantity === undefined){
            quantity = 1;
        }


        const updatedCart = await cartModel.findOneAndUpdate(
            {_id: cartId, "products.id_prod": productId},
        {$inc: {"products.$.quantity": quantity}}
        {new: true}
        );

        if(!updatedCart){
            const cart = await cartModel.findByIdAndUpdate(
                cartId,
                { $push: { products: {id_prod: productId, quantity }},
            {new: true}
            );
            res.status(200).send(cart);
        } else{
            res.status(200).send(updatedCart);
        }

    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
});



export default cartRouter