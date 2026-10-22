//server/src/shared/modules/email/email.types.ts
import type { SendMailOptions } from "nodemailer";

/**
 * Generic email options used throughout
 * the application.
 */
export interface SendEmailOptions {
  /**
   * One recipient or multiple recipients.
   */
  to: string | string[];

  /**
   * Email subject.
   */
  subject: string;

  /**
   * HTML email content.
   */
  html: string;

  /**
   * Plain-text alternative.
   *
   * Recommended for accessibility and
   * email clients that don't render HTML.
   */
  text?: string;

  /**
   * Optional reply-to address.
   */
  replyTo?: string;

  /**
   * Optional CC recipients.
   */
  cc?: string | string[];

  /**
   * Optional BCC recipients.
   */
  bcc?: string | string[];

  /**
   * Optional email attachments.
   */
  attachments?: SendMailOptions["attachments"];
}
