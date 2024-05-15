import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/auth/authenticator.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
    return authenticator.authenticate("auth0", request, {
        successRedirect: "/admin/projects",
        failureRedirect: "/",
    });
};