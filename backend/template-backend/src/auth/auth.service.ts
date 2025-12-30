import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly auth0Domain = process.env.AUTH0_M2M_DOMAIN;
  private readonly clientId = process.env.AUTH0_M2M_CLIENT_ID;
  private readonly clientSecret = process.env.AUTH0_M2M_CLIENT_SECRET;
  private readonly audience = process.env.AUTH0_AUDIENCE;


  async getM2MToken(): Promise<string> {
    try {
      const response = await axios.post(`https://${this.auth0Domain}/oauth/token`, {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: this.audience,
      },
        {
          headers: { 'Content-Type': 'application/json' }
        });

      return response.data.access_token;
    } catch (error) {
      console.error('Error obtaining M2M token:', error);
      throw new HttpException('Failed to obtain access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async exchangeCodeForToken(code: string, redirectUri: string) {
    try {
      const response = await axios.post(
        `https://${this.auth0Domain}/oauth/token`,
        {
          grant_type: 'authorization_code',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
          redirect_uri: redirectUri,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      return {
        access_token: response.data.access_token,
        id_token: response.data.id_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
      };
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw new HttpException(
        'Failed to exchange code for token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  async refreshToken(refreshToken: string) {
    try {
      const response = await axios.post(
        `https://${this.auth0Domain}/oauth/token`,
        {
          grant_type: 'refresh_token',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      return {
        access_token: response.data.access_token,
        id_token: response.data.id_token,
        expires_in: response.data.expires_in,
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new HttpException(
        'Failed to refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}




