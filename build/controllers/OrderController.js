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
class OrderController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const order = yield db.order.findAll({});
            if (order) {
                return res.status(200).send(order);
            }
            return res.status(404).send({ error: "order not found" });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const requiredVariables = ['name', 'address', 'phone_number', 'size', 'quantity', 'is_buy'];
            const missingVariables = requiredVariables.filter(variable => !(variable in req.body));
            if (missingVariables.length > 0) {
                return res.status(400).send({
                    error: `Missing required variables: ${missingVariables.join(', ')}`
                });
            }
            const { name, address, phone_number, size, quantity, is_buy } = req.body;
            yield db.order.create({ name, address, phone_number, size, quantity, is_buy });
            return res.status(200).send({
                message: "success create order"
            });
        });
        this.show = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const order = yield db.order.findOne({
                where: { id }
            });
            if (order) {
                return res.status(200).send(order);
            }
            return res.status(404).send({ error: "order not found" });
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var { name, address, phone_number, size, quantity, is_buy } = req.body;
            // Check if order exists
            const order = yield db.order.findOne({
                where: { id }
            });
            if (!order) {
                return res.status(404).send({ error: "order not found" });
            }
            // Update DB
            try {
                yield db.order.update({ name, address, phone_number, size, quantity, is_buy }, {
                    where: { id }
                });
            }
            catch (error) {
                return res.status(500).send({ error: "failed to update order" });
            }
            return res.status(200).send({
                message: "success update order"
            });
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            // Check if order exists
            const order = yield db.order.findOne({
                where: { id }
            });
            if (!order) {
                return res.status(404).send({ error: "order not found" });
            }
            // Delete order from DB
            try {
                yield db.order.destroy({
                    where: { id }
                });
            }
            catch (error) {
                return res.status(500).send({ error: "failed to delete order" });
            }
            return res.status(200).send({
                message: "success delete order"
            });
        });
    }
}
exports.default = new OrderController();
