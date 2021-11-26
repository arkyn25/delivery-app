module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, { timestamps: false, tableName: 'users' });
   User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignkey: 'userId', as: 'user'
    });
    User.hasMany(models.Sale, {
      foreignkey: 'sellerId', as: 'seller'
    });
  }
  return User;
};