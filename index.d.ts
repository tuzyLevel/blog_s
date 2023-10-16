import { Express } from "express-serve-static-core";

declare type ErrorMsg =
  | "NO_AUTH"
  | "INVALID_ACCESS_TOKEN"
  | "ALREADY_EXIST"
  | "FAILED_INSERT_DATA"
  | "NOT_FOUND"
  | "FAILED_FIND_USER"
  | "INCORRECT_PASSWORD"
  | "TOKEN_ISSUE"
  | "FAILED_CREATE"
  | "FAILED_FIND_DATA"
  | "NO_INPUT_DATA"
  | "FAILED_DELETE_DATA"
  | "NOT_ENOUGH_HEADER_DATA"
  | "NOT_EXPIRED"
  | "FAILED_DELETE_DATA_REMAIN_POSTING"
  | "FAILED_DELETE_DATA_REMAIN_CHILD_BOARD";

declare type Result = {
  ok: boolean;
  code: number;
  msg?: string;
  data?: any;
  description?: string;
};

interface LoginData {
  loginId: string;
  loginPassword: string;
}

declare module "express-serve-static-core" {
  interface Request {
    loginData?: LoginData;
  }
}
