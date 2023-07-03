import jwt, { Secret } from "jsonwebtoken";
const createToken = (
  data: Record<string, unknown>,
  credantial: Secret,
  credantialExpire: string
) => {
  return jwt.sign(data, credantial, { expiresIn: credantialExpire });
};

export default createToken;
