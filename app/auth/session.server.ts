import { createCookieSessionStorage } from "@remix-run/node";

const cookieSessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_wook_status_article_data",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: [process.env.COOKIE_SECRET!],
        secure: process.env.NODE_ENV === "production"
    }
});

export { cookieSessionStorage };
