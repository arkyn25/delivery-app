'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
      await queryInterface.bulkInsert('users', [
         {
            "email": "adm@deliveryapp.com",
            "id": 1,
            "name": "Delivery App Admin",
            "password": "a4c86edecc5aee06eff8fdeda69e0d04",
            "role": "administrator"
          },
          {
            "email": "fulana@deliveryapp.com",
            "id": 2,
            "name": "Fulana Pereira",
            "password": "3c28d2b0881bf46457a853e0b07531c6",
            "role": "seller"
          },
          {
            "email": "zebirita@email.com",
            "id": 3,
            "name": "Cliente Zé Birita",
            "password": "1c37466c159755ce1fa181bd247cb925",
            "role": "customer"
          },

      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
