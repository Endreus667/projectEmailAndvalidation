
import jwt from 'jsonwebtoken';
import { ExtendedRequest } from '../types/extended-request';
import { Request, Response, NextFunction } from 'express';
 

export const createJWT = (id: number) => {
    // Adicione um log para verificar se a chave secreta está correta
    console.log('Creating JWT with secret:', process.env.JWT_SECRET);
    return jwt.sign({ id }, process.env.JWT_SECRET as string);
};



export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
        if (err) {
            return res.status(403).json({ error: 'Acesso negado' });
        }

        req.userId = decoded.id; // Atribuindo o userId ao req
        next(); // Chama o próximo middleware
    });
};


