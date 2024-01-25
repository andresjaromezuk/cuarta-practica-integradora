import nodemailer from 'nodemailer'
import { EMAIL_USER, EMAIL_PASS } from '../config/email.config.js'

class EmailService{

    constructor() {
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth:{
                user: EMAIL_USER,
                pass:EMAIL_PASS
            }
        })
    }

    async send(to, subject, content, attachments = {}){

        const email = {
            from: "andres.jaromezuk@gmail.com",
            to: to,
            subject: subject,
            text: content
        }

        await this.transport.sendMail(email)

    }

}

export const emailService = new EmailService()