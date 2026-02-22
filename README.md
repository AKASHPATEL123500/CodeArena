# ✅ Final Authentication Security Checklist

# 🔐 Login Security

Password hashing using bcrypt

Login attempt limiting (brute-force protection)

Account lock mechanism after multiple failures

Timing attack prevention (dummy hash comparison)

Email normalization (trim + lowercase validation)

# 🎟 Token & Session Security

Access token + Refresh token architecture

Refresh tokens securely stored in database

Tokens delivered via httpOnly cookies

Cookies configured with:

secure

sameSite

Token expiration and rotation handled correctly

# 📧 Account Safety & Recovery

Email verification flow

OTP-based password reset

OTP expiration handling

OTP attempt limits to prevent abuse

# 🔑 Two-Factor Authentication (2FA)

2FA secret generation

QR-code based authenticator setup

OTP verification for 2FA

Enforced 2FA check during login flow

# 🔐 Passkey Authentication (WebAuthn)

Passkey registration flow

Passkey login flow

Passwordless authentication support

Phishing-resistant authentication mechanism

# 🛡 Middleware & Infrastructure Security

Authentication middleware

Role-based authorization middleware

Security headers using Helmet

Proper CORS configuration

Input validation on all critical endpoints

Sensitive fields excluded from responses:

password

refreshToken

# 🧠 Design Philosophy

Security is not optional

Authentication is treated as infrastructure, not a feature

Every flow is designed for real-world production use

Future-ready with Passkeys & WebAuthn

# 🚀 Tech Stack

Node.js

Express.js

MongoDB

JWT

bcrypt

WebAuthn (Passkeys)

OTP / 2FA

# 📌 Ideal Use Cases

SaaS products

Startup backends

Enterprise authentication services

Security-first applications

# ⚠️ Disclaimer

This project focuses on authentication & security logic.
Frontend and UI implementation are intentionally excluded.

## **Authentication System — Design, Logic & Function Reference**

This section documents the authentication architecture, key algorithms, and recommended function signatures (arguments + return values). Use this as a developer reference when implementing or extending the authentication flows in the backend.

### **High-level Components**
- **User model**: stores identity, credentials, metadata, 2FA secret, email verification, account state.
- **Auth controller / service**: exposes login, logout, refresh, signup, verify-email, reset-password, 2FA endpoints.
- **Token store**: refresh tokens persisted (hashed) with device/session metadata and rotation state.
- **OTP service**: short-lived numeric codes (email / SMS) for verification and reset.
- **2FA (TOTP)**: time-based one-time passwords for second factor.
- **Passkeys / WebAuthn**: publicKeyCredential registration and assertion verification.
- **Rate limiter & lockout**: prevents brute force and throttles suspicious clients.

---

### **Data model (recommended fields)**
- `User`:
	- `id` (string/UUID)
	- `email` (string, indexed, unique)
	- `passwordHash` (string)
	- `isEmailVerified` (boolean)
	- `twoFA.enabled` (boolean)
	- `twoFA.secret` (string, encrypted/secret)
	- `webauthn.credentials` (array of { id, publicKey, transports, signCount })
	- `failedLoginCount` (number)
	- `lockedUntil` (Date|null)
	- `roles` (array)

- `RefreshToken` (persist hashed token):
	- `id` (UUID)
	- `userId` (ref)
	- `tokenHash` (string)
	- `deviceInfo` (string)
	- `issuedAt`, `expiresAt`
	- `revoked` (boolean)
	- `replacedBy` (token id) — for rotation

---

### **Core Algorithms & Flows**

1) Password hashing
 - Algorithm: bcrypt (or Argon2 if available in environment)
 - Work factor / rounds configurable via env (e.g., `BCRYPT_SALT_ROUNDS`)
 - Function: `hashPassword(password: string, rounds?: number): Promise<string>`
 - Function: `comparePassword(password: string, hash: string): Promise<boolean>`

2) Login flow (with optional 2FA)
 - Steps:
	 1. Validate email format and fetch user by email.
	 2. If user.lockedUntil > now => reject (account locked).
	 3. Compare password via `comparePassword`.
	 4. If invalid -> increment `failedLoginCount`. If threshold reached, set `lockedUntil` (exponential backoff).
	 5. If valid -> reset `failedLoginCount`, check `twoFA.enabled`:
			- If enabled: issue a short-lived `pre-auth` session or return a `2faRequired` response (do NOT return access tokens yet).
			- If not enabled: issue `accessToken` (short-lived JWT) and `refreshToken` (rotateable, persisted hashed).

 - Functions / Signatures:
	 - `login(email: string, password: string, device?: string): Promise<{ accessToken, refreshToken, twoFARequired?: boolean }>`
	 - `incrementFailedLogin(userId: string): Promise<void>`
	 - `lockAccount(userId: string, until: Date): Promise<void>`

3) JWT Access Token
 - Use asymmetric signing (RS256) where practical; otherwise HS256 with strong secret.
 - Claims: `sub` (userId), `iat`, `exp`, `jti`, `roles`, `session` (optional session id)
 - TTL: short (e.g., 10-15 minutes)
 - Functions:
	 - `generateAccessToken(userId: string, payload?: object, expiresIn?: string): string`
	 - `verifyAccessToken(token: string): { valid: boolean, payload?: object }`

4) Refresh Token & Rotation
 - Persist hashed refresh tokens (`tokenHash = HMAC(token, serverSecret)` or bcrypt)
 - When rotating: issue new refresh token, mark previous token as replaced and store `replacedBy` link.
 - Detect token reuse: if a rotated token is used again (reuse), revoke the entire session and force re-auth.
 - Refresh endpoint flow:
	 1. Client sends `refreshToken` cookie (httpOnly, secure, sameSite=Lax/Strict as needed).
	 2. Server verifies hash, finds token record.
	 3. If token is valid and not expired -> issue new access + new refresh token, persist new hashed refresh token, mark old as replaced.
	 4. If token missing or revoked -> reject and require full login.

 - Functions:
	 - `generateRefreshToken(userId: string, device?: string): { token: string, expiresAt: Date }`
	 - `persistRefreshToken(userId: string, tokenHash: string, deviceInfo: string, expiresAt: Date): Promise<RefreshToken>`
	 - `rotateRefreshToken(oldToken: string): Promise<{ accessToken, refreshToken }>`

5) Email verification & password reset
 - Use single-use tokens stored hashed or short OTPs.
 - Email verification function: `generateEmailToken(userId): string` (store hashed token with expiry)
 - Password reset:
	 - `requestReset(email)`: generate token/OTP, email link with token.
	 - `resetPassword(token, newPassword)`: validate token (hash + expiry), set new `passwordHash`, revoke all `RefreshToken` rows (or rotate sessions).

6) OTP (email / SMS) logic
 - Generate random numeric code (6 digits), store hashed OTP with expiry (e.g., 10 minutes) and attempt count.
 - Function: `generateOTP(userId, type: 'email'|'sms', length = 6): Promise<{ otpId }>`
 - Verify: `verifyOTP(userId, otpId, code): Promise<boolean>` (decrement attempts, remove after success or max tries)

7) TOTP (2FA)
 - Use RFC6238 algorithm (libraries: `speakeasy`), store secret encrypted.
 - Functions:
	 - `generate2FASecret(userId): { secret, otpauthUrl }`
	 - `verify2FAToken(userId, token): boolean`

8) WebAuthn / Passkeys
 - Registration flow (server): generate `challenge`, store temporary registration state, return `PublicKeyCredentialCreationOptions` to client.
 - Verification: verify attestation, store credential id & publicKey for user.
 - Assertion: generate `challenge`, verify signature using stored publicKey.
 - Functions:
	 - `startWebAuthnRegistration(userId): PublicKeyCredentialCreationOptions`
	 - `verifyWebAuthnRegistration(userId, attestationResponse): { success, credential }`
	 - `startWebAuthnAssertion(userId): PublicKeyCredentialRequestOptions`
	 - `verifyWebAuthnAssertion(userId, assertionResponse): { success }`

9) Rate limiting & lockout rules
 - Per-IP + per-account sliding window counters (e.g., Redis)
 - Lock account after N failed attempts within window (e.g., 5 failures in 15 minutes)
 - Exponential backoff for lock duration: e.g., 30s, 5m, 30m, permanent after X cycles

10) Security best-practices
 - Always store secrets/keys in environment variables and never check `.env` into source control.
 - Use `httpOnly` + `secure` cookies for refresh tokens and consider `SameSite` depending on your architecture.
 - Hash refresh tokens before persisting; never store raw refresh tokens.
 - Use short TTLs for access tokens and rotate refresh tokens.
 - Log security events (failed logins, token reuse, revoked tokens) with minimal PII.

---

### **Example Pseudocode: Login + Refresh (rotation)**
// `login`
async function login(email, password, deviceInfo) {
	const user = await findUserByEmail(email);
	if (!user) throw new Error('Invalid credentials');
	if (user.lockedUntil && user.lockedUntil > Date.now()) throw new Error('Account locked');
	const ok = await comparePassword(password, user.passwordHash);
	if (!ok) { await incrementFailedLogin(user.id); throw new Error('Invalid credentials'); }
	await resetFailedLogin(user.id);
	const accessToken = generateAccessToken(user.id);
	const { token: refreshToken, expiresAt } = generateRefreshToken(user.id, deviceInfo);
	await persistRefreshToken(user.id, hash(refreshToken), deviceInfo, expiresAt);
	return { accessToken, refreshToken };
}

// `refresh`
async function refresh(oldRefreshTokenRaw) {
	const hashValue = hash(oldRefreshTokenRaw);
	const tokenRow = await findRefreshTokenByHash(hashValue);
	if (!tokenRow || tokenRow.revoked) throw new Error('Invalid refresh token');
	// rotate
	const newTokens = generateRefreshToken(tokenRow.userId, tokenRow.deviceInfo);
	await persistRefreshToken(tokenRow.userId, hash(newTokens.token), tokenRow.deviceInfo, newTokens.expiresAt);
	tokenRow.revoked = true; tokenRow.replacedBy = newTokens.id; await tokenRow.save();
	const newAccess = generateAccessToken(tokenRow.userId);
	return { accessToken: newAccess, refreshToken: newTokens.token };
}

---

### **Function Reference (quick)**
- `hashPassword(password: string, rounds?: number): Promise<string>` — returns bcrypt hash.
- `comparePassword(password: string, hash: string): Promise<boolean>`.
- `generateAccessToken(userId: string, payload?: object, expiresIn?: string): string`.
- `verifyAccessToken(token: string): { valid: boolean, payload?: object }`.
- `generateRefreshToken(userId: string, device?: string): { token: string, expiresAt: Date }`.
- `persistRefreshToken(userId: string, tokenHash: string, deviceInfo: string, expiresAt: Date): Promise<RefreshToken>`.
- `rotateRefreshToken(oldTokenRaw: string): Promise<{ accessToken: string, refreshToken: string }>`.
- `generateOTP(userId: string, type: 'email'|'sms', length?: number): Promise<{ otpId }>`.
- `verifyOTP(userId: string, otpId: string, code: string): Promise<boolean>`.
- `generate2FASecret(userId: string): { secret: string, otpauthUrl: string }`.
- `verify2FAToken(userId: string, token: string): boolean`.
- `startWebAuthnRegistration(userId: string): PublicKeyCredentialCreationOptions`.
- `verifyWebAuthnRegistration(userId: string, attestationResponse): { success: boolean }`.

If you'd like, I can also:
- Add a minimal `backend/.env.example` with recommended variables (`JWT_PRIVATE_KEY_PATH`, `JWT_PUBLIC_KEY_PATH`, `BCRYPT_SALT_ROUNDS`, `GEMINI_MODEL`, etc.).
- Create small helper modules for `tokenService`, `otpService`, and `webauthnService` with the function skeletons above.

---

End of authentication design notes.
