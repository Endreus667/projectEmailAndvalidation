import {z} from 'zod';

export const authUserOTPSchema = z.object({
    id: z.string({message: 'ID do OTP obrigatorio'}),
    code: z.string({message: 'OTP obrigatorio'}).length(6, 'Código precisa de 6 números')
})