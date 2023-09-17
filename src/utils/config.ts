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
    key: "4eaefd9770e181f254c72a3768e3432b3e3db9eed28027e48dcf28b4aa51de9da500f78e55504326dfde56c8bafd013cb7cdb8f967ddda0335e5e04f0e32564b",
    adminkey: "2a8b29677bf66a916c1591804ca485597c89ec9a7030cedf3b7770d8f2ac399dc4ddfaa1994d5b3c2b01ab79e144a2d169ae24df5740405c3cdb57ba1ed07b28",
    options: {
      expiresIn: "24h",
    },
  },
};
