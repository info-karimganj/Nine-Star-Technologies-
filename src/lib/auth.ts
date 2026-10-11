import crypto from 'crypto';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'CONTENT_MANAGER' | 'SERVICE_MANAGER' | 'SUPPORT_AGENT';
  isActive: boolean;
  passwordHash: string;
  salt: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface SessionPayload {
  userId: string;
  id: string;
  email: string;
  name: string;
  role: AdminUser['role'];
  exp: number;
}

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || '9star-technologies-ultra-secure-jwt-secret-key-2026';

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const computedHash = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(computedHash, 'hex'));
}

export function signToken(payload: Omit<SessionPayload, 'exp'>, expiresInSeconds: number = 86400 * 7): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + expiresInSeconds })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    if (!payload.id) {
      payload.id = payload.userId;
    }
    return payload;
  } catch {
    return null;
  }
}
