import { Request, Response } from "express";
import IController from "./ControllerInterface";
import fs from 'fs';
import path from 'path';

const db = require("../db/models");

class OrderController implements IController{
    index = async(req: Request, res: Response) : Promise<Response> =>{
        const order = await db.order.findAll({});
        if (order) {
            return res.status(200).send(order);
        }
        return res.status(404).send({ error: "order not found" });
    }
    create = async (req: Request, res: Response) : Promise<Response> =>{
        const requiredVariables = ['name', 'address', 'phone_number', 'size', 'quantity', 'is_buy'];
        const missingVariables = requiredVariables.filter(variable => !(variable in req.body));
        if (missingVariables.length > 0) {
            return res.status(400).send({
                error: `Missing required variables: ${missingVariables.join(', ')}`
            });
        }

        const {name, address, phone_number, size, quantity, is_buy} = req.body;
        await db.order.create({name, address, phone_number, size, quantity, is_buy});

        return res.status(200).send({
            message : "success create order"
        });
    }
    show = async(req: Request, res: Response) : Promise<Response> =>{
        const {id}= req.params;
        const order = await db.order.findOne({
            where: {id}
        });

        if (order) {
            return res.status(200).send(order);
        }
        return res.status(404).send({ error: "order not found" });
    }
    update = async(req: Request, res: Response) : Promise<Response> =>{
        const {id}= req.params;
        var {name,address,phone_number,size,quantity,is_buy} = req.body;

        // Check if order exists
        const order = await db.order.findOne({
            where: {id}
        });
        if (!order) {
            return res.status(404).send({ error: "order not found" });
        }

        // Update DB
        try {
            await db.order.update({name,address,phone_number,size,quantity,is_buy},{ 
                where : {id}
            });
        } catch (error) {
            return res.status(500).send({ error: "failed to update order" });
        }

        return res.status(200).send({
            message : "success update order"
        });
    }
    delete = async(req: Request, res: Response) : Promise<Response> =>{
        const id = req.params.id;

        // Check if order exists
        const order = await db.order.findOne({
            where: {id}
        });
        if (!order) {
            return res.status(404).send({ error: "order not found" });
        }

        // Delete order from DB
        try {
            await db.order.destroy({
                where : {id}
            });
        } catch (error) {
            return res.status(500).send({ error: "failed to delete order" });
        }

        return res.status(200).send({
            message : "success delete order"
        });
    }
}

export default new OrderController();