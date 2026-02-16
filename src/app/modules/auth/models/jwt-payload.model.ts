export interface JwtPayload {
  exp: number;
  iat: number;
  iss: string;
  userId: number;
  username: string;
}
