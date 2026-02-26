const congratulationsTemplate = ( userName ) => {
    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Welcome to CodeArena</title>
    <!--[if mso]>
    <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#060608;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#060608;padding:40px 0;">
    <tr>
        <td align="center" style="padding:0 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="max-width:580px;width:100%;">

                <!-- TOP BAR -->
                <tr>
                    <td style="padding-bottom:24px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="font-family:Arial,Helvetica,sans-serif;font-size:22px;
                                    font-weight:900;letter-spacing:3px;color:#ffffff;">
                                    CODE<span style="color:#ff5c00;">ARENA</span>
                                </td>
                                <td align="right">
                                    <span style="display:inline-block;font-family:Arial,Helvetica,sans-serif;
                                        font-size:10px;letter-spacing:2px;text-transform:uppercase;
                                        color:#3ddc84;border:1px solid #3ddc8440;
                                        padding:5px 14px;border-radius:100px;">
                                        &#9679; Account Active
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- MAIN CARD -->
                <tr>
                    <td style="background-color:#0d0d14;border-radius:20px;
                        border:1px solid #1e1e30;">

                        <!-- TOP ACCENT -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="background-color:#ff5c00;height:3px;
                                    font-size:0;line-height:0;border-radius:20px 20px 0 0;">&nbsp;</td>
                            </tr>
                        </table>

                        <!-- HERO -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td align="center" style="padding:52px 40px 44px;
                                    border-bottom:1px solid #1e1e30;">

                                    <!-- Trophy -->
                                    <div style="width:80px;height:80px;
                                        background-color:#ff5c00;
                                        border-radius:50%;
                                        font-size:36px;text-align:center;line-height:80px;
                                        margin:0 auto 28px auto;">
                                        &#127942;
                                    </div>

                                    <!-- Tag -->
                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:10px;
                                        letter-spacing:3px;text-transform:uppercase;color:#ff5c00;
                                        margin:0 0 16px 0;">
                                        // Account Verified
                                    </p>

                                    <!-- Title -->
                                    <p style="font-family:Georgia,'Times New Roman',serif;
                                        font-size:42px;font-weight:900;line-height:1.1;
                                        color:#ffffff;margin:0 0 4px 0;">
                                        Welcome,
                                    </p>
                                    <p style="font-family:Georgia,'Times New Roman',serif;
                                        font-size:52px;font-weight:900;line-height:1.05;
                                        color:#ff5c00;margin:0 0 28px 0;">
                                        ${ userName }!
                                    </p>

                                    <!-- Desc -->
                                    <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                                        style="margin:0 auto;">
                                        <tr>
                                            <td style="border-left:3px solid #ff5c0060;padding-left:16px;">
                                                <p style="font-family:Arial,Helvetica,sans-serif;
                                                    font-size:13px;line-height:1.9;color:#6868a0;
                                                    margin:0;text-align:left;">
                                                    Your account is verified and ready.<br>
                                                    The arena is live &#8212; challenges, battles,<br>
                                                    and your next rank are waiting for you.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                        </table>

                        <!-- STATS -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                            style="border-bottom:1px solid #1e1e30;">
                            <tr>
                                <td width="33%" align="center"
                                    style="padding:28px 12px;border-right:1px solid #1e1e30;">
                                    <p style="font-family:Georgia,'Times New Roman',serif;font-size:36px;
                                        font-weight:900;color:#ffffff;margin:0 0 6px 0;line-height:1;">
                                        15<span style="color:#ff5c00;">00</span>
                                    </p>
                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:9px;
                                        letter-spacing:2px;text-transform:uppercase;
                                        color:#3a3a58;margin:0;">
                                        Start Rating
                                    </p>
                                </td>
                                <td width="33%" align="center"
                                    style="padding:28px 12px;border-right:1px solid #1e1e30;">
                                    <p style="font-family:Georgia,'Times New Roman',serif;font-size:36px;
                                        font-weight:900;color:#ffffff;margin:0 0 6px 0;line-height:1;">
                                        10<span style="color:#ff5c00;">K+</span>
                                    </p>
                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:9px;
                                        letter-spacing:2px;text-transform:uppercase;
                                        color:#3a3a58;margin:0;">
                                        Coders
                                    </p>
                                </td>
                                <td width="33%" align="center" style="padding:28px 12px;">
                                    <p style="font-family:Georgia,'Times New Roman',serif;font-size:36px;
                                        font-weight:900;color:#ffffff;margin:0 0 6px 0;line-height:1;">
                                        500<span style="color:#ff5c00;">+</span>
                                    </p>
                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:9px;
                                        letter-spacing:2px;text-transform:uppercase;
                                        color:#3a3a58;margin:0;">
                                        Challenges
                                    </p>
                                </td>
                            </tr>
                        </table>

                        <!-- FEATURES -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="padding:36px 40px;border-bottom:1px solid #1e1e30;">

                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:9px;
                                        letter-spacing:3px;text-transform:uppercase;color:#3a3a58;
                                        margin:0 0 24px 0;">
                                        // What's Inside
                                    </p>

                                    <!-- Feature 1 -->
                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                                        style="margin-bottom:16px;">
                                        <tr>
                                            <td width="50" valign="middle">
                                                <div style="width:42px;height:42px;
                                                    background-color:#1a0a00;
                                                    border:1px solid #ff5c0040;border-radius:10px;
                                                    font-size:20px;text-align:center;line-height:42px;">
                                                    &#9876;
                                                </div>
                                            </td>
                                            <td valign="middle" style="padding-left:14px;">
                                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                                                    font-weight:700;color:#e0e0f0;margin:0 0 3px 0;">
                                                    Live Code Battles
                                                </p>
                                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;
                                                    color:#44445a;line-height:1.6;margin:0;">
                                                    Duel developers in real-time. Win battles, earn points, climb the leaderboard.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <div style="height:1px;background-color:#1a1a28;margin-bottom:16px;"></div>

                                    <!-- Feature 2 -->
                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                                        style="margin-bottom:16px;">
                                        <tr>
                                            <td width="50" valign="middle">
                                                <div style="width:42px;height:42px;
                                                    background-color:#1a0a00;
                                                    border:1px solid #ff5c0040;border-radius:10px;
                                                    font-size:20px;text-align:center;line-height:42px;">
                                                    &#128225;
                                                </div>
                                            </td>
                                            <td valign="middle" style="padding-left:14px;">
                                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                                                    font-weight:700;color:#e0e0f0;margin:0 0 3px 0;">
                                                    Skill Tracking
                                                </p>
                                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;
                                                    color:#44445a;line-height:1.6;margin:0;">
                                                    Watch your rating rise. Track streaks, battles won, and skills mastered over time.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <div style="height:1px;background-color:#1a1a28;margin-bottom:16px;"></div>

                                    <!-- Feature 3 -->
                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td width="50" valign="middle">
                                                <div style="width:42px;height:42px;
                                                    background-color:#1a0a00;
                                                    border:1px solid #ff5c0040;border-radius:10px;
                                                    font-size:20px;text-align:center;line-height:42px;">
                                                    &#129309;
                                                </div>
                                            </td>
                                            <td valign="middle" style="padding-left:14px;">
                                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                                                    font-weight:700;color:#e0e0f0;margin:0 0 3px 0;">
                                                    Mentor &amp; Startup Network
                                                </p>
                                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;
                                                    color:#44445a;line-height:1.6;margin:0;">
                                                    Connect with mentors and startups actively looking for talent like you.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                        </table>

                        <!-- CTA -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td align="center" style="padding:40px 40px 44px;">
                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;
                                        font-weight:700;color:#c8c8e0;margin:0 0 6px 0;">
                                        Ready to compete?
                                    </p>
                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;
                                        color:#3a3a55;margin:0 0 28px 0;line-height:1.6;">
                                        Your first battle is one click away. No warmup needed.
                                    </p>
                                    <a href="#"
                                        style="display:inline-block;background-color:#ff5c00;
                                        color:#ffffff;font-family:Arial,Helvetica,sans-serif;
                                        font-size:15px;font-weight:700;letter-spacing:1.5px;
                                        text-transform:uppercase;text-decoration:none;
                                        padding:16px 44px;border-radius:10px;">
                                        Enter the Arena &#8594;
                                    </a>
                                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;
                                        color:#2a2a40;margin:16px 0 0 0;">
                                        Free forever plan &nbsp;&bull;&nbsp; No credit card required
                                    </p>
                                </td>
                            </tr>
                        </table>

                        <!-- BOTTOM ACCENT -->
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="background-color:#ff5c00;height:3px;font-size:0;
                                    line-height:0;border-radius:0 0 20px 20px;">&nbsp;</td>
                            </tr>
                        </table>

                    </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                    <td align="center" style="padding:28px 0 0;">
                        <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;
                            color:#2a2a40;line-height:1.8;margin:0;">
                            You received this because you signed up at
                            <a href="#" style="color:#ff5c00;text-decoration:none;">CodeArena</a>.<br>
                            <a href="#" style="color:#2a2a40;text-decoration:none;">Unsubscribe</a>
                            &nbsp;&bull;&nbsp;
                            <a href="#" style="color:#2a2a40;text-decoration:none;">Privacy Policy</a>
                            &nbsp;&bull;&nbsp;
                            <a href="#" style="color:#2a2a40;text-decoration:none;">Help</a>
                        </p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>

</body>
</html>
    `
}

export default congratulationsTemplate