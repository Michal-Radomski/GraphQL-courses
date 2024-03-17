import { Request, Response } from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

import { getUserByEmail } from "./db/users";

const secretString = process.env.SECRET as string;
// console.log({ secretString });

const secret: Buffer = Buffer.from(secretString as string, "base64");
// console.log("secret: ", secret);

export const authMiddleware = expressjwt({
  algorithms: ["HS256"],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    res.sendStatus(401);
  } else {
    const claims = { sub: user.id, email: user.email };
    const token = jwt.sign(claims, secret);
    res.json({ token });
  }
}
