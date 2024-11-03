import { z } from 'zod';

export const authSigninupSchema = z.object({
    name: z.string({ required_error: 'Campo Nome é obrigatório' }), 
    email: z.string({ required_error: 'Campo Email é obrigatório' }).email('Email inválido')  
});
