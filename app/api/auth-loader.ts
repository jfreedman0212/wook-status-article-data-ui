import {ActionFunction, ActionFunctionArgs, LoaderFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {authenticator} from "~/auth/authenticator.server";
import process from "node:process";
import {json} from "@remix-run/react";

type FunctionOrValue<TArgs, TResult> = ((args: TArgs) => (Promise<TResult>) | TResult) | TResult; 

type LoaderReturn = { 
    url: string;
    urlSearchParams?: URLSearchParams;
};

const authLoader = (fn: FunctionOrValue<LoaderFunctionArgs, LoaderReturn>): LoaderFunction => {
    return async ({ request, ...rest }) => {
        const loggedInUser = await authenticator.isAuthenticated(request, {
            failureRedirect: "/",
        });

        const authHeaders: HeadersInit = {
            Authorization: `Bearer ${loggedInUser.accessToken}`
        };
        
        const { url, urlSearchParams = new URLSearchParams() } = typeof fn === 'function' 
            ? await fn({ request, ...rest }) 
            : fn;
        const fullUrl = new URL(url, `${process.env.WOOK_API_BASE_URL}`);

        for (const [key, value] of urlSearchParams) {
            fullUrl.searchParams.set(key, value);
        }

        const response = await fetch(fullUrl, { headers: authHeaders });

        if (response.ok) {
            return response;
        }

        switch (response.status) {
            case 401: {
                await authenticator.logout(request, { redirectTo: '/' });
                return redirect('/');
            }
            default:
                throw response;
        }
    };
};

type ActionReturn<T> = {
    url: string;
    urlSearchParams?: URLSearchParams;
    method: string;
    body?: T;
    redirectUrl?: string;
}

const authAction = <T>(fn: FunctionOrValue<ActionFunctionArgs, ActionReturn<T>>): ActionFunction => {
    return async ({ request, ...rest }) => {
        const loggedInUser = await authenticator.isAuthenticated(request, {
            failureRedirect: "/",
        });
        
        const headers = new Headers({ Authorization: `Bearer ${loggedInUser.accessToken}` });
        const { url, urlSearchParams = new URLSearchParams(), method, body, redirectUrl } = typeof fn === 'function' 
            ? await fn({ request, ...rest })
            : fn;
        const fullUrl = new URL(url, `${process.env.WOOK_API_BASE_URL}`);

        for (const [key, value] of urlSearchParams) {
            fullUrl.searchParams.set(key, value);
        }
        
        if (body) {
            headers.set('Content-Type', 'application/json');
        }
        
        const response = await fetch(fullUrl, { 
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers
        });
        
        if (response.ok) {
            return redirectUrl ? redirect(redirectUrl) : response;
        }

        switch (response.status) {
            case 400: {
                const body = await response.json() as { errors?: Record<string, string[]> } | null;
                return json(body?.errors, { status: 400, statusText: 'Bad Request' });
            }
            case 401: {
                await authenticator.logout(request, { redirectTo: '/' });
                return redirect('/');
            }
            default: 
                throw response;
        }
    };
};

export { authAction, authLoader };
