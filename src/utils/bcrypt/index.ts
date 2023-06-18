import * as bcrypt from 'bcrypt';
const SALT_ROUND = 10;

export const createBcryptHash = (text: string): string => {
  const salt = bcrypt.genSaltSync(SALT_ROUND);
  return bcrypt.hashSync(text, salt);
};

export const compareBcryptHash = (text: string, hash: string): boolean => {
  return bcrypt.compareSync(text, hash);
};
