import dotenv from "dotenv";
dotenv.config();


const TOKENSECRETKEY = process.env.TOKENSECRETKEY;
const TOKENEXPIRY = process.env.TOKENEXPIRY;


export {
  TOKENEXPIRY,
  TOKENSECRETKEY,

};
