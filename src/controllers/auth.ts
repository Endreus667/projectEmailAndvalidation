import { RequestHandler } from "express";
import { authSigningSchema } from "../schemas/auth-signin";
import { createUser, getUsertByEmail } from "../services/user";
import { generate, validateOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { authSigninupSchema } from "../schemas/auth-signinup";
import { authUserOTPSchema } from "../schemas/auth-useotp";
import { createJWT } from "../libs/jwt";


export const signin: RequestHandler = async (req, res) => {
    //validar dados recebidos
    const data = authSigningSchema.safeParse(req.body);
    if(!data.success) {
        res.json({error: data.error.flatten().fieldErrors});
        return;
    }
    //verificar se o usuario existe baseado no email
    const user = await getUsertByEmail(data.data.email);
    if(!user) {
        res.json({error:'Usuario nao existe'});
        return;
    }
    //gerar um codigo otp para este usuario
    const otp = await generate(user.id); 

    //enviar um email para o usuario
    await sendEmail(
        user.email,
        'Seu código de acesso é: '+otp.code,
        'Digite seu código: '+otp.code
    )
    
    //devolver o ID no codigo otp
    res.json({id: otp.id});
}


export const signinup: RequestHandler = async (req, res): Promise<void> => {
    // Validar os dados recebidos
    const data = authSigninupSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.flatten().fieldErrors });
        return; // Certifique-se de retornar aqui
    }

    // Verificar se o email já existe
    const user = await getUsertByEmail(data.data.email);
    if (user) {
        res.status(409).json({ error: 'Já existe usuário com este email' });
        return; // Retorne aqui também
    }

    // Criar o usuário
    const newUser = await createUser(data.data.name, data.data.email);
    console.log('Novo usuário criado:', newUser);

    // Retorna os dados do usuário recém criado
    res.status(201).json({ user: newUser });
};

export const useOTP: RequestHandler = async (req, res) => {
    //validar os dados recebidos
    const data = authUserOTPSchema.safeParse(req.body);
    if(!data.success) {
        res.json({error: data.error.flatten().fieldErrors});
        return;
    }
    //validar o otp
    const user = await validateOTP(data.data.id, data.data.code);
    if(!user) {
        res.json({error: 'otp invalido ou expirado'});
        return;
    }
    //cria o jwt
    const token = createJWT(user.id);
    //retorna o jwt
    res.json({token, user})
}

