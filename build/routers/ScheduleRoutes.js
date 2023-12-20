"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRoutes_1 = __importDefault(require("./BaseRoutes"));
//controllers
const ScheduleController_1 = __importDefault(require("../controllers/ScheduleController"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
class ScheduleRoutes extends BaseRoutes_1.default {
    routes() {
        this.router.put("/:id", AuthMiddleware_1.auth, ScheduleController_1.default.update);
        this.router.get("", AuthMiddleware_1.auth, ScheduleController_1.default.index);
    }
}
exports.default = new ScheduleRoutes().router;
