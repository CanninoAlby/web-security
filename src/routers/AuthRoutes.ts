import BaseRoutes from "./BaseRoutes";
import validate  from "../middlewares/AuthValidator";
//controllers
import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes{
    public routes(): void{
        this.router.post("/login",validate, AuthController.login);
    }
}

export default new AuthRoutes().router;