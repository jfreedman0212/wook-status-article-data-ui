import { Authenticator } from "remix-auth";
import { cookieSessionStorage } from "~/auth/session.server";
import {auth0Strategy, LoggedInUser} from "~/auth/auth0-strategy.server";

const authenticator = new Authenticator<LoggedInUser>(cookieSessionStorage);
authenticator.use(auth0Strategy);

export { authenticator };
