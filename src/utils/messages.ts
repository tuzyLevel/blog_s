import type { Result, ErrorMsg } from "@/index";

import ErrorCodes from "../errorCodes";

// export const getResultMsg = (ok: boolean, code: string, data?: any) => {
//   const result: Result = { ok, code };
//   if (data) result.data = data;

//   return result;
// };

export const getSuccessResult = (code: number, msg?: string, data?: any) => {
  const result: Result = { ok: true, code };
  if (msg) result.msg = msg;
  if (data) result.data = data;
  return result;
};

export const getErrorResult = (msg: ErrorMsg, description?: string) => {
  const result: Result = { ok: false, code: ErrorCodes[msg]!, msg };
  if (description) result.description = description;
  return result;
};
