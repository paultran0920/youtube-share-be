import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AccountEntity } from 'src/account/entities/account.entity';

export const toHash = async (rawStr: string) => {
  return await bcrypt.hash(rawStr, 10);
};

export const isMatch = async (rawStr: string, hashStr: string) => {
  return await bcrypt.compare(rawStr, hashStr);
};

export const toSafeAccount = (account: AccountEntity) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = account;
  return rest;
};

export const generateExpicableToken = async (email: string, secret: string) => {
  const token = jwt.sign({ email }, secret, {
    expiresIn: '1d',
  });
  return token;
};

export const verifyExpicableToken = async (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      email: (decoded as any).email,
    };
  } catch (error) {
    return false;
  }
};
