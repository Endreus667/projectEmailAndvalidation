import { MailtrapClient } from "mailtrap"

export const sendEmail = async(to: string, subject: string, body:string) =>{
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        //abaixo é temporario
        testInboxId: 3250991
    });

    try{
        //o testing é temporario apenas para testes
        await mailtrap.testing.send({
            from: {name: 'sistema', email: 'sistema@gmail.com'},
            to: [{email: to}],
            subject,
            text: body
        });
    } catch(err) {
        return false;
    }
}