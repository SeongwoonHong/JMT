import * as bcrypt from 'bcrypt';

export const hash = (password: string): string => {
  return bcrypt.hash(password, 10)
    .then(hash => hash)
    .catch(err => {
      throw new Error(err);
    });
};

export const compare = (plainPassword: string, hashedPassword: string): boolean => {
  return bcrypt.compare(plainPassword, hashedPassword)
    .then(res => res === true)
    .catch(err => {
      throw new Error(err);
    });
};
