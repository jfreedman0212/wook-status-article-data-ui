import {Auth0ExtraParams, Auth0Profile, Auth0Strategy} from "remix-auth-auth0";
import {OAuth2StrategyVerifyParams} from "remix-auth-oauth2";

type LoggedInUser = OAuth2StrategyVerifyParams<Auth0Profile, Auth0ExtraParams>;

const auth0Strategy = new Auth0Strategy(
    {
        callbackURL: process.env.AUTH0_CALLBACK_URL!,
        clientID: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        domain: process.env.AUTH0_DOMAIN!,
        audience: process.env.AUTH0_AUDIENCE!
    },
    async (params) => {
        return params;
    }
);

export { auth0Strategy, type LoggedInUser };
