import { sign } from 'jsonwebtoken';

export function tokenGenerator(username: string): string {

    const secret: string = process.env.ACCESS_TOKEN_SECRET;
    const token = sign({ username }, secret, { expiresIn: '100m' });
    
    return token;
}