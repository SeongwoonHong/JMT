import * as bcrypt from 'bcrypt';

export const hash = (password: string): string => {
  return bcrypt.hash(password, 10)
    .then(hash => hash)
    .catch(err => console.log(err))
}

export const compare = (plainPassword, hashedPassword): boolean => {
  return bcrypt.compare(plainPassword, hashedPassword)
    .then(res => res === true)
    .catch(err => console.log(err))
}
