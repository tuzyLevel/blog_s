import { Sequelize, DataTypes } from "sequelize";

const f = (sequelize: Sequelize, schema: string) => {
  const Posting = sequelize.define(
    "Posting",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      readCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      boardId: {
        type: DataTypes.INTEGER,
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
      tableName: "POSTING",
      timestamps: true,
    }
  );
  return Posting;
};

export default f;
