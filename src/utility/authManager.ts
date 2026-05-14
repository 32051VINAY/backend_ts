import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

const secret = 'dssdfgkfhhgcdzkljjhj';

export interface TokenPayload {
  email: string;
}

export const signjwt = (payload: TokenPayload): string | Error => {
  try {
    const options: SignOptions = { expiresIn: '5h' };
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (err) {
    return err as Error;
  }
};

export const verifytoken = (token: string): JwtPayload | string | Error => {
  try {
    const tk = jwt.verify(token, secret);
    return tk;
  } catch (err) {
    return err as Error;
  }
};
