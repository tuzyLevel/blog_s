import { Sequelize, DataTypes } from "sequelize";

const f = (sequelize: Sequelize, schema: string) => {
  const Token = sequelize.define(
    "Token",
    {
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
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
      tableName: "TOKEN",
      timestamps: true,
    }
  );
  return Token;
};

export default f;
