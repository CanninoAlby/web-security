'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //  * Add seed commands here.
    //  *
    //   Example:
    await queryInterface.bulkInsert('schedules', [{
      title: "Gelombang 1",
      date: new Date("2023-10-11T10:00:00"),
      created_at: new Date(),
      updated_at: new Date()
    },{
      title: "Gelombang 2",
      date: new Date("2023-11-11T10:00:00"),
      created_at: new Date(),
      updated_at: new Date()
    },{
      title: "Pelatihan",
      date: new Date("2023-11-20T10:00:00"),
      created_at: new Date(),
      updated_at: new Date()
    },{
      title: "Pelantikan",
      date: new Date("2023-11-30T10:00:00"),
      created_at: new Date(),
      updated_at: new Date()
    },], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
