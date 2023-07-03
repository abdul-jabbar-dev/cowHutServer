import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const varifyToken = async function (token: string, key: Secret) {
  return  jwt.verify(token, key) as JwtPayload;
};
export default varifyToken;