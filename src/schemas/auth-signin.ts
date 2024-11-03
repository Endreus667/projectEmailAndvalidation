import { z } from 'zod';

export const authSigningSchema = z.object({
    email: z.string({ required_error: 'Campo Email é obrigatório' }).email('Email inválido')
});