export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
}

export interface SendEmailService {
  sendConfirmationEmail(options: SendEmailOptions): Promise<boolean>;
  sendResetPasswordEmail(options: SendEmailOptions): Promise<boolean>;
  resendConfirmationToken(options: SendEmailOptions): Promise<boolean>;
}
