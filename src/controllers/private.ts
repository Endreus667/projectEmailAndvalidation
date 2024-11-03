import { RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extended-request"; // Ajuste o caminho se necessário
import { getUsertById } from "../services/user";

export const test: RequestHandler = async (req: ExtendedRequest, res: Response): Promise<any> => {
    // Verifica se o userId está presente no request
    if (!req.userId) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    // Obtém o usuário pelo ID
    const user = await getUsertById(req.userId);

    // Verifica se o usuário existe
    if (!user) {
        return res.status(401).json({ error: 'Acesso negado' });
    }

    // Retorna os dados do usuário
    res.json({ user });
};
