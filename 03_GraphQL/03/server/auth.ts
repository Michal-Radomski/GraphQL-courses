import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { getUser } from "./db/users";

const secretString = process.env.SECRET as string;
// console.log({ secretString });

const secret: Buffer = Buffer.from(secretString as string, "base64");
// console.log("secret: ", secret);

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

export function decodeToken(token: string) {
  return jwt.verify(token, secret);
}

export async function handleLogin(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (!user || user.password !== password) {
    res.sendStatus(401);
  } else {
    const claims = { sub: username };
    const token = jwt.sign(claims, secret);
    res.json({ token });
  }
}
