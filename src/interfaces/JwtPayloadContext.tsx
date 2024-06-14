export interface JwtPayload {
  userId: string;
  name: string;
  role: string;
  isAdmin: boolean;
  access: string;
  iat: number;
  exp: number;
}