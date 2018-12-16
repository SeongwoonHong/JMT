import * as nodemailer from 'nodemailer';

const { GMAIL_USER: user, GMAIL_PASS: pass } = process.env;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass,
  }
});

export const sendMail = (payload, url) => transporter.sendMail({
  to: payload.email,
  subject: 'Verification Email',
  html: `
    <table style="box-sizing: border-box; height: 150px; margin: 0 auto 10px auto; padding: 5px 5px 5px 5px; width: 100%; text-align: center;" width="100%" height="150" align="center">
    <tbody style="box-sizing: border-box;">
      <tr style="box-sizing: border-box;">
        <td style="box-sizing: border-box; font-size: 12px; font-weight: 300; vertical-align: top; color: rgb(111, 119, 125); margin: 0; padding: 0;" valign="top">
          <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 300px; margin: 0 auto  auto;">
            <span style="box-sizing: border-box; font-size: 22px;">Hello! Welcome to JMT.</span>
            <br style="box-sizing: border-box;">
            <br style="box-sizing: border-box;">Please click the button below to verify your email and continue the registration process.
          </div>
          <table style="box-sizing: border-box; height: 150px; margin: 20px auto 10px auto; padding: 5px 5px 5px 5px; width: 100%;" width="100%" height="150">
            <tbody style="box-sizing: border-box;">
              <tr style="box-sizing: border-box;">
                <td style="box-sizing: border-box; margin-top: 25px; font-size: 12px; font-weight: 300; vertical-align: top; color: rgb(111, 119, 125); margin: 0; padding: 0; text-align: center;" valign="top" align="center">
                  <a href="${url}" style="box-sizing: border-box; font-size: 12px; text-decoration: none; padding-top: 10px; padding-right: 20px; padding-bottom: 10px; padding-left: 20px; background-color: rgb(217, 131, 166); color: rgb(255, 255, 255); text-align: center; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; font-weight: 300; padding: 10px 20px 10px 20px; margin: 20px 0 0 0;">Verify Email Address</a>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  `
});
