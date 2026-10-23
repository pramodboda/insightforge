//server/src/shared/modules/email/email.service.ts

// =====================================================
// Main Gmail SMTP service
// =====================================================
import nodemailer, { type Transporter, type SendMailOptions } from "nodemailer";

import { env } from "../../config/env";

import type { SendEmailOptions } from "./email.types";

/**
 * EmailService
 *
 * This class contains all SMTP/Nodemailer
 * implementation details.
 *
 * Other parts of the application should NOT
 * need to know how Gmail SMTP works.
 */
class EmailService {
  /**
   * Nodemailer transporter.
   *
   * We create this once and reuse it.
   */
  private readonly transporter: Transporter;

  constructor() {
    /**
     * Create Gmail SMTP transporter.
     */

    // console.log("SMTP CONFIG:", {
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: process.env.SMTP_SECURE,
    //   user: process.env.SMTP_USER,
    //   passwordLoaded: Boolean(process.env.SMTP_PASSWORD),
    // });

    this.transporter = nodemailer.createTransport({
      // ---------------------------------------
      // Gmail SMTP server
      // ---------------------------------------

      host: env.SMTP_HOST,

      port: env.SMTP_PORT,

      secure: env.SMTP_SECURE,

      // ---------------------------------------
      // Google Workspace authentication
      // ---------------------------------------

      auth: {
        user: env.SMTP_USER,

        /**
         * This is the Google Workspace
         * App Password.
         *
         * NEVER use your normal Google
         * account password here.
         */
        pass: env.SMTP_PASSWORD,
      },

      // ---------------------------------------
      // Optional connection settings
      // ---------------------------------------

      connectionTimeout: 10_000,

      greetingTimeout: 10_000,

      socketTimeout: 20_000,
    });
  }

  /**
   * Verify that the SMTP server can be
   * reached and authenticated.
   *
   * Useful during development/deployment
   * troubleshooting.
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();

      console.log("✅ Google Workspace SMTP connection successful");

      return true;
    } catch (error) {
      console.error("❌ Google Workspace SMTP connection failed");

      console.error(error);

      return false;
    }
  }

  /**
   * Send an email.
   *
   * This is the generic email method that
   * the rest of the application can use.
   */
  async sendEmail(options: SendEmailOptions): Promise<string> {
    const mailOptions: SendMailOptions = {
      // ---------------------------------------
      // Sender
      // ---------------------------------------

      from: {
        name: env.EMAIL_FROM_NAME,
        address: env.EMAIL_FROM_ADDRESS,
      },

      // ---------------------------------------
      // Recipients
      // ---------------------------------------

      to: options.to,

      // ---------------------------------------
      // Email content
      // ---------------------------------------

      subject: options.subject,

      html: options.html,

      text: options.text,

      // ---------------------------------------
      // Optional fields
      // ---------------------------------------

      replyTo: options.replyTo,

      cc: options.cc,

      bcc: options.bcc,

      attachments: options.attachments,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);

      console.log("📧 Email sent successfully", {
        messageId: info.messageId,

        accepted: info.accepted,

        rejected: info.rejected,
      });

      /**
       * Return the SMTP/Nodemailer message ID.
       *
       * Useful for logging/debugging.
       */
      return info.messageId;
    } catch (error) {
      console.error("❌ Email sending failed");

      console.error(error);

      throw error;
    }
  }
}

/**
 * Export ONE shared instance.
 *
 * Do not create a new EmailService inside
 * every controller/request.
 */
export const emailService = new EmailService();
