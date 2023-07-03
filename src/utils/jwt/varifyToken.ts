import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const varifyToken = async function (token: string, key: Secret) {
  return (await jwt.verify(token, key)) as JwtPayload;
};
export default varifyToken;
