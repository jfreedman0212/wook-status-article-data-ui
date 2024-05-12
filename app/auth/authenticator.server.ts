import { Authenticator } from "remix-auth";
import { cookieSessionStorage } from "~/auth/session.server";
import {auth0Strategy} from "~/auth/auth0-strategy.server";

const authenticator = new Authenticator<string>(cookieSessionStorage);
authenticator.use(auth0Strategy);

export { authenticator };
