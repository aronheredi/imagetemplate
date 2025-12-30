import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('m2m-token')
    async getM2MToken(): Promise<string> {
        const token = await this.authService.getM2MToken();
        return token;
    }


    @Public()
    @Get('callback')
    async handleCallback(@Query('code') code: string, @Query('state') state: string): Promise<{ access_token: string; refresh_token: string, id_token: string }> {
        const redirectUri = `${process.env.BACKEND_URL}/auth/callback`;
        const tokens = await this.authService.exchangeCodeForToken(code, redirectUri);

        return tokens;
    }

    @Public()
    @Post('refresh')
    async refreshToken(@Body('refresh_token') refreshToken: string) {
        return await this.authService.refreshToken(refreshToken);
    }
}
