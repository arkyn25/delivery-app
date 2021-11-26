'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales', [
    { 
      id: 1,
      user_id: 3,
      seller_id: 2,
      total_price: 9.70,
      delivery_address: 'Rua Ribeiro do Amparo',
      delivery_number: 43,
      status: 'Pendente'
    }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  }
};