module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProducts', {
    saleId: DataTypes.INTEGER,
    productId:DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'salesProducts', underscored: true });
    

  SalesProduct.associate = (models) => {

    models.SalesProducts.hasOne(models.Product, { foreignKey: 'id', as: 'products' });
    // models.Sale.belongsToMany(models.Product, {
    //   as: 'products',
    //   through: SalesProduct,
    //   foreignKey: 'saleId',
    //   otherKey: 'productId',
    // });
    // models.Product.belongsToMany(models.Sale, {
    //   as: 'sales',
    //   through: SalesProduct,
    //   foreignKey: 'productId',
    //   otherKey: 'saleId',
    // });
  }
  return SalesProduct;
};