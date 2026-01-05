import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

type JwtPayload = {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });

    const secret = process.env.JWT_SECRET || 'your-secret-key';
  }

  async validate(payload: JwtPayload) {
    console.log('[JwtStrategy] Validating payload:', payload);

    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      console.error('[JwtStrategy] User not found for sub:', payload.sub);
      throw new UnauthorizedException();
    }

    return { userId: user.id, email: user.email };
  }
}
