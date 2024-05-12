import { authenticator } from "~/auth/authenticator.server";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const loader = () => redirect("/");

export const action = ({ request }: ActionFunctionArgs) => {
    return authenticator.authenticate("auth0", request);
};
