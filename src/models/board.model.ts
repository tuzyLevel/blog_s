import { Sequelize, DataTypes } from "sequelize";

const f = (sequelize: Sequelize, schema: string) => {
  const Board = sequelize.define(
    "Board",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      tableName: "BOARD",
      timestamps: true,
    }
  );
  return Board;
};

export default f;
