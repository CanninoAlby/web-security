import BaseRoutes from "./BaseRoutes";
//controllers
import OrderController from "../controllers/OrderController";
import { auth } from "../middlewares/AuthMiddleware";


class OrderRoutes extends BaseRoutes{

    public routes(): void{
        this.router.get("/",auth, OrderController.index);
        this.router.post("/",OrderController.create);
        this.router.get("/:id",auth, OrderController.show); 
        this.router.put("/:id",auth,OrderController.update);
        this.router.delete("/:id",auth, OrderController.delete);
    }
}

export default new OrderRoutes().router;