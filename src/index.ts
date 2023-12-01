import express, { Application , Request , Response} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import  { config as dotenv } from "dotenv";

//routers
import AuthRoutes from "./routers/AuthRoutes";
import GalleryRoutes from "./routers/GalleryRoutes";
import ScheduleRoutes from "./routers/ScheduleRoutes";
import OrderRoutes from "./routers/OrderRoutes";

class App{  
    public app: Application;

    constructor(){
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void{
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
        
    }


    protected routes(): void {
        this.app.use("/api/v1/auth",AuthRoutes);
        this.app.use("/api/v1/gallery",GalleryRoutes);
        this.app.use("/api/v1/schedule",ScheduleRoutes);
        this.app.use("/api/v1/order",OrderRoutes);
        this.app.use("/api/v1/public", express.static('public/img'));
    } 
}

const port : number = 8000;
const app = new App().app;
app.listen(port,()=>{
    console.log(port);
});