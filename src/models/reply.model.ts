import { Sequelize, DataTypes } from "sequelize";

const f = (sequelize: Sequelize, schema: string) => {
  const Reply = sequelize.define(
    "Reply",
    {
      no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
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
      tableName: "REPLY",
      timestamps: true,
    }
  );
  return Reply;
};

export default f;
