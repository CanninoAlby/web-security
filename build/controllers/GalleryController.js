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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db = require("../db/models");
const url = "http://localhost:8000/";
class GalleryController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gallery = yield db.gallery.findAll({});
            if (gallery) {
                const modifiedGallery = gallery.map((item) => {
                    item.img = url + "api/v1/public/" + item.img;
                    return item;
                });
                return res.status(200).send(modifiedGallery);
            }
            return res.send("file not found");
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var { title } = req.body;
            var img;
            if (req.file) {
                img = req.file.filename;
            }
            yield db.gallery.create({ title, img });
            return res.status(200).send({
                message: "success create gallery"
            });
        });
        this.show = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const gallery = yield db.gallery.findOne({
                where: { id }
            });
            if (gallery) {
                var message = url + "api/v1/public/" + gallery.img;
                return res.status(200).send({ message });
            }
            return res.send({
                message: "gallery not found"
            });
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var { title } = req.body;
            var img;
            if (req.file) {
                img = req.file.filename;
            }
            //Delete File
            const gallery = yield db.gallery.findOne({
                where: { id }
            });
            const filePath = path_1.default.join(__dirname, '../../public/img', gallery.img);
            fs_1.default.unlinkSync(filePath);
            //Update DB
            yield db.gallery.update({ title, img }, {
                where: { id }
            });
            return res.status(200).send({
                message: "success update gallery"
            });
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const gallery = yield db.gallery.findOne({
                where: { id }
            });
            // Construct the path to the file based on the ID
            const filePath = path_1.default.join(__dirname, '../../img', gallery.img);
            // Check if the file exists
            if (fs_1.default.existsSync(filePath)) {
                // Delete the file
                fs_1.default.unlinkSync(filePath);
                yield db.gallery.destroy({
                    where: { id }
                });
                return res.status(200).json({ message: 'File removed successfully' });
            }
            return res.status(404).json({ error: 'File not found' });
        });
    }
}
exports.default = new GalleryController();
