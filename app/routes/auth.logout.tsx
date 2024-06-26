import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { cookieSessionStorage } from "~/auth/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const session = await cookieSessionStorage.getSession(request.headers.get("Cookie"));
    const logoutURL = new URL(process.env.AUTH0_LOGOUT_URL!);

    logoutURL.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID!);
    logoutURL.searchParams.set("returnTo", process.env.AUTH0_RETURN_TO_URL!);

    return redirect(logoutURL.toString(), {
        headers: {
            "Set-Cookie": await cookieSessionStorage.destroySession(session),
        },
    });
};
