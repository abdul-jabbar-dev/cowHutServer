const PORT = 5000;
const MONGO_URL =
  "mongodb+srv://cowhut123:cowhut123@cluster0.wmqs3en.mongodb.net/myhutwithauth";
const SALT = 12;
const SECRET = "mysecret";
const SECRET_EXPIRE_IN = "1H";
const REFRESH = "myrefresh";
const REFRESH_EXPIRE_IN = "10D";

const config = {
  MONGO_URL,
  PORT,
  SALT,
  jwt: {
    SECRET,
    SECRET_EXPIRE_IN,
    REFRESH,
    REFRESH_EXPIRE_IN,
  },
};
export default config;
