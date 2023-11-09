import { Request, Response } from "express";
import Authentication from "../utils/Authentication";

const db = require("../db/models");


class AuthController{
    login = async(req: Request, res: Response) : Promise<Response> =>{
        let{ username, password } = req.body;

        const admin = await db.admin.findOne({
            where: {username}
        });

        let compare = await Authentication.passwordCompare(password,admin.password);

        if(compare){
            let token = Authentication.generateToken(admin.id, admin.username,admin.password);
            return res.send({
                token
            })
        }

        return res.send("auth failed")
    }

}

export default new AuthController();