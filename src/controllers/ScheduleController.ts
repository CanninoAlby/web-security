import { Request, Response } from "express";
import IController from "./ControllerInterface";
import schedule from "../db/models/schedule";

const db = require("../db/models");

class ScheduleController implements IController{
    index(req: Request, res: Response): Promise<Response> {
        return db.schedule.findAll()
            .then((schedules: any) => {
                return res.json(schedules);
            })
            .catch((error: any) => {
                return res.status(500).json({ error: "Internal server error" });
            });
    }
    create(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    show(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    update = async(req: Request, res: Response): Promise<Response> =>{
        const {id}= req.params;
        const {date} = req.body;
        await db.schedule.update({date},{ 
            where : {id}
        });
        return res.send("successfully update schedule");
    }
    delete(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }

}

export default new ScheduleController();