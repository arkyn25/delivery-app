module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    sale_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, },
    status: DataTypes.STRING,
    
  }, { timestamps: false, tableName: 'sales', underscored: true });

  Sale.associate = (models) => {
    models.Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    models.Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
    // models.Sale.belongsTo(models.SalesProducts, { foreignKey: 'id', as: 'salesProducts' });
  }
  return Sale;
};