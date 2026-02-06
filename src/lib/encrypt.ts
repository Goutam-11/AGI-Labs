import { CryptrAsync } from 'cryptr';

const cryptr = new CryptrAsync(process.env.ENCRYPTION_KEY || "");

export const encode = (text: string) => {
  return cryptr.encrypt(text);
};

export const decode = (text: string) => {
  return cryptr.decrypt(text);
};
