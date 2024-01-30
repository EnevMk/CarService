import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log("HEADER: ", authHeader);
    if (token === undefined || token === '') {
        return res.status(400).json({ message: 'No Token' });
    }

    try {
        const user = verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    } catch (err) {
        res.status(403).json({
            message: 'Unable to verify token',
            err
        });
        return;
    }

    next();
}