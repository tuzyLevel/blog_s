import dotenv from "dotenv";
import { Sequelize, Dialect } from "sequelize";
import Token from "./token.model";
import User from "./user.model";
import Board from "./board.model";
import Posting from "./posting.model";
import DPosting from "./d_posting.model";

dotenv.config();
const env = process.env;
const schema = env.DB_SCHEMA!;
const config = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT as Dialect,
    port: env.DB_PORT,
  },
};

const pool = { max: 10, min: 0, acquire: 30000, idle: 10000 };

const sequelize = new Sequelize(
  config.development.database!,
  config.development.username!,
  config.development.password,
  { host: config.development.host, dialect: "postgres", pool }
);

const userModel = User(sequelize, schema);
const tokenModel = Token(sequelize, schema);
const boardModel = Board(sequelize, schema);
const postingModel = Posting(sequelize, schema);
const dPostingModel = DPosting(sequelize, schema);

userModel.hasOne(tokenModel, {
  foreignKey: "uuid",
  sourceKey: "uuid",
  constraints: true,
  onDelete: "cascade",
});
tokenModel.belongsTo(userModel, {
  foreignKey: "uuid",
});

boardModel.hasMany(boardModel, {
  foreignKey: "parent_id",
  sourceKey: "id",
  as: "ChildEntity",
  constraints: true,
  onDelete: "restrict",
});

postingModel.belongsTo(boardModel, {
  foreignKey: "board_id",
});

export default sequelize;
