import jwt from "jsonwebtoken";

import sequelize from "../models";

export const sign = (payload: any) => {
  //{payload, secretOrPrivateKey, [options]}

  const secretOrPrivateKey = process.env.JWT_SIGN_KEY as string;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  return jwt.sign(payload, secretOrPrivateKey, { expiresIn });
};

// export const verify = (token: string) => {
//   const secretOrPrivateKey = process.env.JWT_SIGN_KEY as string;

//   try {
//     const decoded = jwt.verify(token, secretOrPrivateKey) as jwt.JwtPayload & {
//       userId: string;
//     };
//     if (decoded) return true;
//     else return false;
//   } catch (e) {
//     console.error(e);
//     return false;
//   }
// };

export const verify = (token: string) => {
  const secretOrPrivateKey = process.env.JWT_SIGN_KEY as string;

  try {
    const decoded = jwt.verify(token, secretOrPrivateKey) as jwt.JwtPayload & {
      userId: string;
    };
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const refresh = () => {
  const secretOrPrivateKey = process.env.JWT_SIGN_KEY as string;
  const expiresIn = process.env.JWT_REF_TOKEN_EXPIRES_IN as string;
  const algorithm = process.env.JWT_SIGN_ALGORITHM as jwt.Algorithm;
  return jwt.sign({}, secretOrPrivateKey, {
    algorithm,
    expiresIn,
  });
};

export const refreshVerify = (token: string) => {
  const secretOrPrivateKey = process.env.JWT_SIGN_KEY as string;
  try {
    jwt.verify(token, secretOrPrivateKey);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
