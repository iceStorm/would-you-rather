import * as jose from 'jose'

export class JwtService {
    private static expirationTime = process.env.REACT_APP_TOKEN_EXPIRATION
    private static privateKey = new TextEncoder().encode(process.env.REACT_APP_PRIVATE_KEY)

    /**
     * Sign @params as payload to a JWT token.
     */
    static sign(params: Record<string, any>) {
        return new jose.SignJWT(params).setExpirationTime(this.expirationTime).sign(this.privateKey)
    }

    /**
     * Verifying a signed JWT token.
     * @param token The token from frontend to verify against
     * @returns Payload of the token
     */
    static verify(token: string) {
        return jose.jwtVerify(token, this.privateKey)
    }
}
