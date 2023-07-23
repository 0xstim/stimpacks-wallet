import CryptoJS from "crypto-js";

export const encryptWithAES = (text:string, salt:string) => {
  return CryptoJS.AES.encrypt(text, salt).toString();
};

export const decryptWithAES = (ciphertext:string, salt: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
