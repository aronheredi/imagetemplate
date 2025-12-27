import { useAuth0 } from '@auth0/auth0-react';

export async function getAccessToken(getTokenSilently: any) {
    return await getTokenSilently({
        authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
    });
}
