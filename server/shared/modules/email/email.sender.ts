//server/src/shared/modules/email/email.sender.ts
import { emailService } from "./email.service";

import {
    signUpSuccessEmailTemplate,
    welcomeEmailTemplate,
    verifyEmailTemplate,
    passwordResetTemplate,
} from "./email.templates";

/**
 * Send sign-up success email.
 */
export const sendSignUpSuccessEmail = async ({
    email,
    name,
}: {
    email: string;
    name: string;
}): Promise<string> => {
    return emailService.sendEmail({
        // to: email,
        to: "pramodkumarboda@gmail.com;",

        subject: "Welcome to APP Name",

        html: signUpSuccessEmailTemplate(name),

        text: `
Welcome ${name}!

Your account has been created successfully.

Thank you for using APP Name.
    `,
    });
};

/**
 * Send welcome email.
 */
export const sendWelcomeEmail = async ({
    email,
    name,
}: {
    email: string;
    name: string;
}): Promise<string> => {
    return emailService.sendEmail({
        to: email,

        subject: "Welcome to APP Name",

        html: welcomeEmailTemplate(name),

        text: `
Welcome ${name}!

Your account has been created successfully.

Thank you for using App Name.
    `,
    });
};

/**
 * Send email verification email.
 */
export const sendVerificationEmail = async ({
    email,
    name,
    verificationUrl,
}: {
    email: string;
    name: string;
    verificationUrl: string;
}): Promise<string> => {
    return emailService.sendEmail({
        to: email,

        subject: "Verify your ProjectName email",

        html: verifyEmailTemplate(name, verificationUrl),

        text: `
Hello ${name},

Please verify your email address:

${verificationUrl}

If you did not create this account,
you can safely ignore this email.
    `,
    });
};

/**
 * Send password reset email.
 */
export const sendPasswordResetEmail = async ({
    email,
    name,
    resetUrl,
}: {
    email: string;
    name: string;
    resetUrl: string;
}): Promise<string> => {
    return emailService.sendEmail({
        to: email,

        subject: "Reset your ProjectName password",

        html: passwordResetTemplate(name, resetUrl),

        text: `
Hello ${name},

We received a request to reset your password.

Reset your password here:

${resetUrl}

If you did not request this,
you can safely ignore this email.
    `,
    });
};
