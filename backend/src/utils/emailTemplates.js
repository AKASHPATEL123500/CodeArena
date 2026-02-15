const otpTemplate = ( otp, name = "User" ) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Code - CodeArena</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Work+Sans:wght@400;500;700&family=Courier+Prime:wght@700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Work Sans', Arial, sans-serif; background-color: #FFFEF9;">
    
    <!-- Main Container -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #FFFEF9;">
        <tr>
            <td style="padding: 40px 20px;">
                
                <!-- Email Card -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 700px; margin: 0 auto; background: #ffffff; box-shadow: 0 0 0 1px #000000;">
                    
                    <!-- Masthead -->
                    <tr>
                        <td style="padding: 0; background: #000000;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 25px 40px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 50%; vertical-align: middle;">
                                                    <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: #ffffff; letter-spacing: -1px; font-style: italic;">
                                                        CodeArena
                                                    </h1>
                                                </td>
                                                <td style="width: 50%; text-align: right; vertical-align: middle;">
                                                    <p style="margin: 0; font-size: 11px; color: #ffffff; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">
                                                        Vol. 1 • 2025
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Hero Section -->
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <!-- Left Column - Large Number -->
                                    <td style="width: 35%; padding: 50px 0 50px 40px; vertical-align: middle; border-right: 3px solid #000000;">
                                        <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 180px; font-weight: 900; color: #000000; line-height: 0.8; letter-spacing: -8px;">
                                            ${ name.charAt( 0 ).toUpperCase() }
                                        </h2>
                                    </td>
                                    
                                    <!-- Right Column - Welcome Text -->
                                    <td style="width: 65%; padding: 50px 40px 50px 35px; vertical-align: middle;">
                                        <p style="margin: 0 0 12px; font-size: 13px; color: #000000; text-transform: uppercase; letter-spacing: 3px; font-weight: 700; border-bottom: 2px solid #000000; display: inline-block; padding-bottom: 5px;">
                                            WARRIOR INDUCTION
                                        </p>
                                        <h3 style="margin: 0 0 18px; font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: #000000; line-height: 1.1; letter-spacing: -1px;">
                                            Welcome,<br>${ name }
                                        </h3>
                                        <p style="margin: 0; font-size: 16px; color: #333333; line-height: 1.7; font-weight: 400;">
                                            Your verification code awaits below. Enter it to complete your registration and step into the arena where code becomes art.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="height: 3px; background: #000000;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- OTP Section - Editorial Style -->
                    <tr>
                        <td style="padding: 60px 40px;">
                            
                            <!-- Label -->
                            <div style="margin-bottom: 30px;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td style="background: #000000; padding: 8px 20px;">
                                            <p style="margin: 0; font-size: 11px; color: #ffffff; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">
                                                ⚔️ Your Access Code
                                            </p>
                                        </td>
                                        <td style="padding-left: 15px; vertical-align: middle;">
                                            <p style="margin: 0; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">
                                                Valid for 10 minutes
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- OTP Display - Magazine Style -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 5px solid #000000; background: #FFFEF9;">
                                <tr>
                                    <td style="padding: 50px 40px; text-align: center;">
                                        
                                        <!-- Decorative Quote Mark -->
                                        <p style="margin: 0 0 20px; font-family: 'Playfair Display', serif; font-size: 72px; color: #CCCCCC; line-height: 1;">"</p>
                                        
                                        <!-- OTP Digits -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                ${ otp.split( '' ).map( ( digit, index ) => `
                                                    <td style="padding: 0 ${ index < otp.length - 1 ? '5px' : '0' };">
                                                        <div style="display: inline-block; min-width: 70px; text-align: center;">
                                                            <span style="font-family: 'Courier Prime', monospace; font-size: 72px; font-weight: 700; color: #000000; letter-spacing: 0; line-height: 1;">${ digit }</span>
                                                            ${ index < otp.length - 1 ? '<span style="font-size: 60px; color: #CCCCCC; padding: 0 5px;">•</span>' : '' }
                                                        </div>
                                                    </td>
                                                `).join( '' ) }
                                            </tr>
                                        </table>
                                        
                                        <!-- Bottom Quote Mark -->
                                        <p style="margin: 20px 0 0; font-family: 'Playfair Display', serif; font-size: 72px; color: #CCCCCC; line-height: 1; transform: rotate(180deg); display: inline-block;">"</p>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Instruction -->
                            <p style="margin: 25px 0 0; font-size: 14px; color: #666666; text-align: center; font-style: italic;">
                                Enter this code to unlock your warrior credentials
                            </p>
                            
                        </td>
                    </tr>
                    
                    <!-- Feature Section - 3 Columns -->
                    <tr>
                        <td style="padding: 0 40px 60px;">
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    
                                    <!-- Column 1 -->
                                    <td style="width: 33.33%; padding-right: 20px; vertical-align: top; border-top: 3px solid #000000; padding-top: 25px;">
                                        <p style="margin: 0 0 10px; font-size: 48px; line-height: 1;">01</p>
                                        <h4 style="margin: 0 0 12px; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #000000; line-height: 1.2;">
                                            Secure
                                        </h4>
                                        <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">
                                            Military-grade encryption protects your credentials
                                        </p>
                                    </td>
                                    
                                    <!-- Column 2 -->
                                    <td style="width: 33.33%; padding: 0 10px; vertical-align: top; border-top: 3px solid #000000; padding-top: 25px;">
                                        <p style="margin: 0 0 10px; font-size: 48px; line-height: 1;">02</p>
                                        <h4 style="margin: 0 0 12px; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #000000; line-height: 1.2;">
                                            Instant
                                        </h4>
                                        <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">
                                            One-time code for immediate account activation
                                        </p>
                                    </td>
                                    
                                    <!-- Column 3 -->
                                    <td style="width: 33.33%; padding-left: 20px; vertical-align: top; border-top: 3px solid #000000; padding-top: 25px;">
                                        <p style="margin: 0 0 10px; font-size: 48px; line-height: 1;">03</p>
                                        <h4 style="margin: 0 0 12px; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #000000; line-height: 1.2;">
                                            Private
                                        </h4>
                                        <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">
                                            Your code, your account, absolute privacy
                                        </p>
                                    </td>
                                    
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Stats Banner -->
                    <tr>
                        <td style="padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #000000;">
                                <tr>
                                    <td style="padding: 40px;">
                                        
                                        <p style="margin: 0 0 25px; text-align: center; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">
                                            THE ARENA BY NUMBERS
                                        </p>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                
                                                <td style="width: 33.33%; text-align: center; padding: 20px 10px; border-right: 1px solid #333333;">
                                                    <p style="margin: 0 0 8px; font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: #ffffff; line-height: 1;">1.2M</p>
                                                    <p style="margin: 0; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Active Warriors</p>
                                                </td>
                                                
                                                <td style="width: 33.33%; text-align: center; padding: 20px 10px; border-right: 1px solid #333333;">
                                                    <p style="margin: 0 0 8px; font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: #ffffff; line-height: 1;">850K</p>
                                                    <p style="margin: 0; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Battles Won</p>
                                                </td>
                                                
                                                <td style="width: 33.33%; text-align: center; padding: 20px 10px;">
                                                    <p style="margin: 0 0 8px; font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: #ffffff; line-height: 1;">195</p>
                                                    <p style="margin: 0; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Countries</p>
                                                </td>
                                                
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Security Notice -->
                    <tr>
                        <td style="padding: 60px 40px;">
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <!-- Left - Icon -->
                                    <td style="width: 80px; vertical-align: top;">
                                        <div style="width: 70px; height: 70px; background: #000000; text-align: center; line-height: 70px; font-size: 36px;">
                                            🛡️
                                        </div>
                                    </td>
                                    
                                    <!-- Right - Content -->
                                    <td style="padding-left: 30px; vertical-align: top;">
                                        <h4 style="margin: 0 0 15px; font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #000000; line-height: 1.2;">
                                            Security First
                                        </h4>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 12px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="width: 25px; vertical-align: top; padding-top: 2px;">
                                                                <div style="width: 18px; height: 18px; background: #000000; border-radius: 50%;"></div>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6; font-weight: 500;">
                                                                    <strong style="font-weight: 700;">Never share</strong> this code with anyone, including CodeArena staff
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-bottom: 12px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="width: 25px; vertical-align: top; padding-top: 2px;">
                                                                <div style="width: 18px; height: 18px; background: #000000; border-radius: 50%;"></div>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6; font-weight: 500;">
                                                                    Our team will <strong style="font-weight: 700;">never ask</strong> for your verification code
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="width: 25px; vertical-align: top; padding-top: 2px;">
                                                                <div style="width: 18px; height: 18px; background: #000000; border-radius: 50%;"></div>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.6; font-weight: 500;">
                                                                    Code expires in 10 minutes and is <strong style="font-weight: 700;">single-use only</strong>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- CTA -->
                    <tr>
                        <td style="padding: 0 40px 60px; text-align: center;">
                            <p style="margin: 0 0 25px; font-size: 15px; color: #666666;">
                                Questions about your verification?
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="background: #000000; padding: 18px 50px;">
                                        <a href="mailto:support@codearena.com" style="display: block; color: #ffffff; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">
                                            Contact Support
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 0; background: #000000;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 50px 40px;">
                                        
                                        <!-- Social Links -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 35px;">
                                            <tr>
                                                <td style="padding: 0 12px; text-align: center;">
                                                    <a href="#" style="display: inline-block; width: 50px; height: 50px; border: 2px solid #ffffff; text-align: center; line-height: 46px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700;">𝕏</a>
                                                </td>
                                                <td style="padding: 0 12px; text-align: center;">
                                                    <a href="#" style="display: inline-block; width: 50px; height: 50px; border: 2px solid #ffffff; text-align: center; line-height: 46px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700;">in</a>
                                                </td>
                                                <td style="padding: 0 12px; text-align: center;">
                                                    <a href="#" style="display: inline-block; width: 50px; height: 50px; border: 2px solid #ffffff; text-align: center; line-height: 46px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700;">@</a>
                                                </td>
                                                <td style="padding: 0 12px; text-align: center;">
                                                    <a href="#" style="display: inline-block; width: 50px; height: 50px; border: 2px solid #ffffff; text-align: center; line-height: 46px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700;">▶</a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Copyright -->
                                        <p style="margin: 0 0 8px; text-align: center; font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: #ffffff; font-style: italic;">
                                            CodeArena
                                        </p>
                                        <p style="margin: 0 0 25px; text-align: center; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 3px;">
                                            © 2025 • All Rights Reserved
                                        </p>
                                        
                                        <!-- Links -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 12px; border-right: 1px solid #333333;">
                                                    <a href="#" style="font-size: 11px; color: #999999; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">Privacy</a>
                                                </td>
                                                <td style="padding: 0 12px; border-right: 1px solid #333333;">
                                                    <a href="#" style="font-size: 11px; color: #999999; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">Terms</a>
                                                </td>
                                                <td style="padding: 0 12px; border-right: 1px solid #333333;">
                                                    <a href="#" style="font-size: 11px; color: #999999; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">Support</a>
                                                </td>
                                                <td style="padding: 0 12px;">
                                                    <a href="#" style="font-size: 11px; color: #999999; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">Unsubscribe</a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>

</body>
</html>
    `;
}

export { otpTemplate };