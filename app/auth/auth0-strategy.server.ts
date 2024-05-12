import {Auth0Strategy} from "remix-auth-auth0";

const auth0Strategy = new Auth0Strategy(
    {
        callbackURL: process.env.AUTH0_CALLBACK_URL!,
        clientID: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        domain: process.env.AUTH0_DOMAIN!
    },
    async ({ accessToken }) => {
        return accessToken;
    }
);

export { auth0Strategy };
