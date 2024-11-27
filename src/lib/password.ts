import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const PEPPER = process.env.PASSWORD_PEPPER || crypto.randomBytes(32).toString('hex');
const SALT_ROUNDS = 12;

interface HashOptions {
  pepper?: boolean;
}

export const hashPassword = async (password: string, options: HashOptions = { pepper: true }) => {
  try {
    const pepperedPassword = options.pepper ? password + PEPPER : password;

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(pepperedPassword, salt);

    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
};

export const verifyPassword = async (
  providedPassword: string,
  hashedPassword: string,
  options: HashOptions = { pepper: true },
) => {
  try {
    const pepperedPassword = options.pepper ? providedPassword + PEPPER : providedPassword;

    return await bcrypt.compare(pepperedPassword, hashedPassword);
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Failed to verify password');
  }
};
