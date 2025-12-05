import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-change-this-in-production';
const API_SECRET_KEY = process.env.API_SECRET_KEY || 'your-secret-key-change-this-in-production';

export function verifyApiKey(apiKey: string): boolean {
  return apiKey === API_SECRET_KEY;
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
