import {
    json,
    Links,
    Meta,
    Outlet, Scripts, ScrollRestoration, useRouteLoaderData,
} from "@remix-run/react";
import {Layout as MyLayout} from "~/components/layout";
import {ReactNode} from "react";
import {LinksFunction, LoaderFunction} from "@remix-run/node";
import rootCss from '~/index.css?url';
import {authenticator} from "~/auth/authenticator.server";

export const loader: LoaderFunction = async ({request}) => {
    const loggedInUser = await authenticator.isAuthenticated(request);
    
    if (!loggedInUser) return null;
    
    return json({
        name: loggedInUser.profile.displayName
    });
};

export const links: LinksFunction = () => [
    {rel: 'stylesheet', href: rootCss}
];

export function Layout({children}: { children: ReactNode }) {
    const loggedInUser = useRouteLoaderData<{ name: string } | null>('root');

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
            <MyLayout loggedInUser={loggedInUser}>{children}</MyLayout>
            <ScrollRestoration/>
            <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
