export interface ConfirmationTemplateData {
  token: string;
  FRONT_URL: string;
  to: string;
}

export interface EmailTemplateService {
  getConfirmationTemplate(data: ConfirmationTemplateData): string;
  getResetPasswordTemplate(data: ConfirmationTemplateData): string;
  getResendConfirmationTemplate(data: ConfirmationTemplateData): string;
} 