"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
//controllers
const GalleryController_1 = __importDefault(require("../controllers/GalleryController"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const GalleryMiddleware_1 = require("../middlewares/GalleryMiddleware");
class GalleryRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.get("/", AuthMiddleware_1.auth, GalleryController_1.default.index);
        this.router.post("/", AuthMiddleware_1.auth, GalleryMiddleware_1.upload.single('image'), GalleryController_1.default.create);
        this.router.get("/:id", AuthMiddleware_1.auth, GalleryController_1.default.show);
        this.router.put("/:id", AuthMiddleware_1.auth, GalleryMiddleware_1.upload.single('image'), GalleryController_1.default.update);
        this.router.delete("/:id", AuthMiddleware_1.auth, GalleryController_1.default.delete);
    }
}
exports.default = new GalleryRoutes().router;
