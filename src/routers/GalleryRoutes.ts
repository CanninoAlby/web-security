import BaseRoutes from "./BaseRoutes";
//controllers
import GalleryController from "../controllers/GalleryController";
import { auth } from "../middlewares/AuthMiddleware";
import Upload from "../middlewares/UploadMiddleware";


class GalleryRoutes extends BaseRoutes{

    public routes(): void{
        this.router.get("/",auth, GalleryController.index);
        this.router.post("/",auth, Upload,GalleryController.create);
        this.router.get("/:id",auth, GalleryController.show); 
        this.router.put("/:id",auth,Upload, GalleryController.update);
        this.router.delete("/:id",auth, GalleryController.delete);
    }
}

export default new GalleryRoutes().router;