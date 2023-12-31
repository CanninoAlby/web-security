"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db/models");
class ScheduleController {
    constructor() {
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { date } = req.body;
            yield db.schedule.update({ date }, {
                where: { id }
            });
            return res.send("successfully update schedule");
        });
    }
    index(req, res) {
        return db.schedule.findAll()
            .then((schedules) => {
            return res.json(schedules);
        })
            .catch((error) => {
            return res.status(500).json({ error: "Internal server error" });
        });
    }
    create(req, res) {
        throw new Error("Method not implemented.");
    }
    show(req, res) {
        throw new Error("Method not implemented.");
    }
    delete(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.default = new ScheduleController();
