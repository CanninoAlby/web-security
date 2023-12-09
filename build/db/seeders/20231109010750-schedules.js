'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            //  * Add seed commands here.
            //  *
            //   Example:
            yield queryInterface.bulkInsert('schedules', [{
                    title: "Gelombang 1",
                    date: new Date("2023-10-11T10:00:00"),
                    created_at: new Date(),
                    updated_at: new Date()
                }, {
                    title: "Gelombang 2",
                    date: new Date("2023-11-11T10:00:00"),
                    created_at: new Date(),
                    updated_at: new Date()
                }, {
                    title: "Pelatihan",
                    date: new Date("2023-11-20T10:00:00"),
                    created_at: new Date(),
                    updated_at: new Date()
                }, {
                    title: "Pelantikan",
                    date: new Date("2023-11-30T10:00:00"),
                    created_at: new Date(),
                    updated_at: new Date()
                },], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
        });
    }
};
