import {LoaderFunction} from "@remix-run/node";
import {authenticator} from "~/auth/authenticator.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/",
    });
};

export default function Admin() {
    return (
        <p>Hello, I am logged in!</p>
    );
}