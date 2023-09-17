import * as dotenv from "dotenv";

const env = dotenv.config();
if (!env) throw new Error("No env file found");

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  CAPTCHA_KEY: process.env.CAPTCHA_KEY,
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_IMAGE_KEY: process.env.CLOUDFLARE_IMAGE_KEY,
  CLOUDFLARE_IMAGE_TOKEN: process.env.CLOUDFLARE_IMAGE_TOKEN,
  CLOUDFLARE_IMAGE_ACCOUNT_HASH: process.env.CLOUDFLARE_IMAGE_ACCOUNT_HASH,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,

  JWT: {
    key: process.env.JWT_KEY,
    adminkey: process.env.JWT_ADMIN_KEY,
    options: {
      expiresIn: "24h",
    },
  },
};
