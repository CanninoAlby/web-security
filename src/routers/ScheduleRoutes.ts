import BaseRoutes from "./BaseRoutes";
//controllers
import ScheduleController from "../controllers/ScheduleController";
import { auth } from "../middlewares/AuthMiddleware";


class ScheduleRoutes extends BaseRoutes{

    public routes(): void{
        this.router.put("/:id",auth,ScheduleController.update);
        this.router.get("",ScheduleController.index);
    }
}

export default new ScheduleRoutes().router;