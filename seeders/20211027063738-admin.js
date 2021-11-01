'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash("admin", salt);

      await queryInterface.bulkInsert('Users', [{
        fullname: 'Admin Dewe',
        nophone: "088235886038",
        gender: "male",
        address: "Surabaya Jawa Timur",
        email: "admintour@tour.com",
        password: pass,
        role: "admin"
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
