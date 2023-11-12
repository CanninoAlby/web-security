import { Request, Response } from "express";
import IController from "./ControllerInterface";
import fs from 'fs';
import path from 'path';

const db = require("../db/models");

class OrderController implements IController{
    index = async(req: Request, res: Response) : Promise<Response> =>{
        const order = await db.order.findAll({});
        if (order) {
            return res.send(order);
        }
        return res.send("order not found");
    }
    create = async (req: Request, res: Response) : Promise<Response> =>{
        var {name,address,number,size,quantity,is_buy} = req.body;
        await db.order.create({name,address,number,size,quantity,is_buy});

        return res.send({
            message : "success create gallery"
        });
    }
    show = async(req: Request, res: Response) : Promise<Response> =>{
        const {id}= req.params;
        const order = await db.order.findOne({
            where: {id}
        });

        if (order) {
            return res.send(order);
        }
        return res.send("order not found");
    }
    update = async(req: Request, res: Response) : Promise<Response> =>{
        const {id}= req.params;
        var {name,address,number,size,quantity,is_buy} = req.body;

        //Update DB
        await db.order.update({name,address,number,size,quantity,is_buy},{ 
            where : {id}
        });

        return res.send({
            message : "success update order"
        });
    }
    delete = async(req: Request, res: Response) : Promise<Response> =>{
        const id = req.params.id;
        await db.gallery.destroy({
            where : {id}
        })
        return res.send({
            message : "success delete order"
        });
    }

}

export default new OrderController();