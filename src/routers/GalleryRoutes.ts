import BaseRoutes from "./BaseRoutes";
//controllers
import GalleryController from "../controllers/GalleryController";
import { auth } from "../middlewares/AuthMiddleware";
import { upload } from "../middlewares/GalleryMiddleware";


class GalleryRoutes extends BaseRoutes{

    public routes(): void{
        this.router.get("/",auth, GalleryController.index);
        this.router.post("/",auth, upload.single('image'),GalleryController.create);
        this.router.get("/:id",auth, GalleryController.show); 
        this.router.put("/:id",auth,upload.single('image'), GalleryController.update);
        this.router.delete("/:id",auth, GalleryController.delete);
    }
}

export default new GalleryRoutes().router;