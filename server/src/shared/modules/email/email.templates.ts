//server/src/shared/modules/email/email.templates.ts

/**
 * Escape HTML special characters.
 *
 * This is useful when inserting user-provided
 * values into HTML emails.
 */
const escapeHtml = (value: string): string => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
  
  /**
   * Common application email layout.
   */
  const emailLayout = ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }): string => {
    return `
  <!DOCTYPE html>
  
  <html lang="en">
  
  <head>
  
    <meta charset="UTF-8">
  
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    >
  
    <title>${escapeHtml(title)}</title>
  
  </head>
  
  
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
  
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
    >
  
      <tr>
  
        <td align="center">
  
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              max-width: 600px;
              width: 100%;
              margin: 40px auto;
              background-color: #ffffff;
            "
          >
  
            <!-- Header -->
  
            <tr>
  
              <td
                style="
                  padding: 24px;
                  background-color: #111827;
                  color: #ffffff;
                  text-align: center;
                "
              >
  
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                  "
                >
                  Testing ProjectName Stage Emails
                </h1>
  
              </td>
  
            </tr>
  
  
            <!-- Content -->
  
            <tr>
  
              <td
                style="
                  padding: 32px;
                  color: #333333;
                "
              >
  
                ${content}
  
              </td>
  
            </tr>
  
  
            <!-- Footer -->
  
            <tr>
  
              <td
                style="
                  padding: 20px;
                  background-color: #f8f8f8;
                  color: #777777;
                  text-align: center;
                  font-size: 12px;
                "
              >
  
                This is an automated email.
                Please do not reply unless instructed.
  
              </td>
  
            </tr>
  
          </table>
  
        </td>
  
      </tr>
  
    </table>
  
  </body>
  
  </html>
  `;
  };
  
  /**
   * Welcome email.
   */
  export const signUpSuccessEmailTemplate = (name: string): string => {
    const safeName = escapeHtml(name);
  
    return emailLayout({
      title: "Welcome to ProjectName",
  
      content: `
  
        <h2>
          Welcome, ${safeName}!
        </h2>
  
        <p style="color: #00ff15ff; font-size: 16px; line-height: 1.5;">
          Your account has been created successfully.
        </p>
  
        <p style="font-size: 16px; line-height: 1.5;">
          Thank you for using ProjectName.
        </p>
  
         <p style="font-size: 16px; line-height: 1.5;">
          From Project Name team.
        </p>
  
      `,
    });
  };
  
  /**
   * Welcome email.
   */
  export const welcomeEmailTemplate = (name: string): string => {
    const safeName = escapeHtml(name);
  
    return emailLayout({
      title: "Welcome to ProjectName",
  
      content: `
  
        <h2>
          Welcome, ${safeName}!
        </h2>
  
        <p>
          Your account has been created successfully.
        </p>
  
        <p>
          Thank you for using ProjectName.
        </p>
  
      `,
    });
  };
  
  /**
   * Email verification template.
   */
  export const verifyEmailTemplate = (
    name: string,
    verificationUrl: string,
  ): string => {
    const safeName = escapeHtml(name);
  
    const safeUrl = escapeHtml(verificationUrl);
  
    return emailLayout({
      title: "Verify your email",
  
      content: `
  
        <h2>
          Hello ${safeName},
        </h2>
  
        <p>
          Please verify your email address
          to activate your account.
        </p>
  
        <p style="margin: 30px 0;">
  
          <a
            href="${safeUrl}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #111827;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Verify Email
          </a>
  
        </p>
  
        <p>
          If you did not create this account,
          you can safely ignore this email.
        </p>
  
      `,
    });
  };
  
  /**
   * Password reset template.
   */
  export const passwordResetTemplate = (
    name: string,
    resetUrl: string,
  ): string => {
    const safeName = escapeHtml(name);
  
    const safeUrl = escapeHtml(resetUrl);
  
    return emailLayout({
      title: "Reset your password",
  
      content: `
  
        <h2>
          Hello ${safeName},
        </h2>
  
        <p>
          We received a request to reset
          your password.
        </p>
  
        <p style="margin: 30px 0;">
  
          <a
            href="${safeUrl}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #111827;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Reset Password
          </a>
  
        </p>
  
        <p>
          This link should expire after the
          configured reset-token lifetime.
        </p>
  
        <p>
          If you did not request this,
          you can safely ignore this email.
        </p>
  
      `,
    });
  };
  