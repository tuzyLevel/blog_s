import { Sequelize, DataTypes } from "sequelize";

const f = (sequelize: Sequelize, schema: string) => {
  const User = sequelize.define(
    "User",
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn("NOW"),
        allowNull: false,
      },
    },
    {
      schema,
      underscored: true,
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "USER",
      timestamps: true,
    }
  );
  return User;
};

export default f;
