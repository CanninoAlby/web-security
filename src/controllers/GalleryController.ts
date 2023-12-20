import { Request, Response } from "express";
import IController from "./ControllerInterface";
import gallery from "../db/models/gallery";
import fs from 'fs';
import path from 'path';

const db = require("../db/models");
const url = "http://localhost:8000/"

class GalleryController implements IController{
    index = async(req: Request, res: Response) : Promise<Response> =>{
        const gallery = await db.gallery.findAll({});
        if (gallery) {
            const modifiedGallery = gallery.map((item: any) => {
                item.img = url + "api/v1/public/" + item.img;
                return item;
            });
            return res.status(200).send(modifiedGallery);
        }
        return res.send("file not found");
    }
    create = async (req: Request, res: Response) : Promise<Response> =>{
        var {title} = req.body;
        var img;
        if (!req.file) {
            console.log("No file received");
            return res.send({
              success: false
            });
        }
        if(req.file){
            img = req.file.filename;
        }
        await db.gallery.create({title,img});

        return res.status(200).send({
            message : "success create gallery"
        });
    }
    show = async(req: Request, res: Response) : Promise<Response> =>{
        const {id}= req.params;
        const gallery = await db.gallery.findOne({
            where: {id}
        });

        if (gallery) {
            var img = url+"api/v1/public/" + gallery.img
            var title = gallery.title
            return res.status(200).send({title,img});
        }
        return res.send({
            message : "gallery not found"
        });
    }
    update = async(req: Request, res: Response) : Promise<Response> =>{
        const {id}= req.params;
        var {title} = req.body;
        var img;
        if(req.file){
            img = req.file.filename;
        }

        //Delete File
        const gallery = await db.gallery.findOne({
            where: {id}
        });
        const filePath = path.join(__dirname, '../../public/img', gallery.img);
        fs.unlinkSync(filePath);

        //Update DB
        await db.gallery.update({title,img},{ 
            where : {id}
        });

        return res.status(200).send({
            message : "success update gallery"
        });
    }
    delete = async(req: Request, res: Response) : Promise<Response> =>{
        const id = req.params.id;
        const gallery = await db.gallery.findOne({
            where: {id}
        });

        // Construct the path to the file based on the ID
        const filePath = path.join(__dirname, '../../img', gallery.img);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Delete the file
            fs.unlinkSync(filePath);
            await db.gallery.destroy({
                where : {id}
            })
            return res.status(200).json({ message: 'File removed successfully' });
        }
        return res.status(404).json({ error: 'File not found' });
    }

}

export default new GalleryController();