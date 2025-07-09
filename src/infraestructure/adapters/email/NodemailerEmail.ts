import nodemailer, { Transporter } from "nodemailer";
import {
  SendEmailOptions,
  SendEmailService,
} from "@/domain/services/EmailService";

export class NodemailerEmail implements SendEmailService {
  private transporter: Transporter;

  constructor(
    private readonly mailerService: string,
    private readonly mailerEmail: string,
    private readonly senderEmailPassword: string,
    private readonly postToProvider: boolean
  ) {
    this.transporter = nodemailer.createTransport({
      service: this.mailerService,
      auth: {
        user: this.mailerEmail,
        pass: this.senderEmailPassword,
      },
    });
  }

  private async sendEmail(options: SendEmailOptions): Promise<boolean> {
    try {
      if (!this.postToProvider) return true;

      const { to, subject, htmlBody } = options;

      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  async resendConfirmationToken(options: SendEmailOptions): Promise<boolean> {
    return await this.sendEmail(options);
  }
  async sendConfirmationEmail(options: SendEmailOptions): Promise<boolean> {
    return await this.sendEmail(options);
  }
  async sendResetPasswordEmail(options: SendEmailOptions): Promise<boolean> {
    return await this.sendEmail(options);
  }
}
