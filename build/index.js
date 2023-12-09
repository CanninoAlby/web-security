"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
//routers
const AuthRoutes_1 = __importDefault(require("./routers/AuthRoutes"));
const GalleryRoutes_1 = __importDefault(require("./routers/GalleryRoutes"));
const ScheduleRoutes_1 = __importDefault(require("./routers/ScheduleRoutes"));
const OrderRoutes_1 = __importDefault(require("./routers/OrderRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
        (0, dotenv_1.config)();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use("/api/v1/auth", AuthRoutes_1.default);
        this.app.use("/api/v1/gallery", GalleryRoutes_1.default);
        this.app.use("/api/v1/schedule", ScheduleRoutes_1.default);
        this.app.use("/api/v1/order", OrderRoutes_1.default);
        this.app.use("/api/v1/public", express_1.default.static('public/img'));
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(port);
});
