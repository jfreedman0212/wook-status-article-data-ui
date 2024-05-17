import {authenticator} from "~/auth/authenticator.server";
import process from "node:process";
import {json, redirect} from "@remix-run/react";

type CustomRequestInit<T> = Omit<RequestInit, 'body'> & {
    body?: T;
};

const wookApiFetch = async <TBody>(
    request: Request,
    url: string | URL,
    { headers, method = 'get', body, ...options }: CustomRequestInit<TBody> = {}
): Promise<Response> => {
    const loggedInUser = await authenticator.isAuthenticated(request, {
        failureRedirect: "/",
    });
    
    const combinedHeaders = new Headers(headers);
    combinedHeaders.set("Authorization", `Bearer ${loggedInUser.accessToken}`);
    
    if (body) {
        combinedHeaders.set('Content-Type', 'application/json');
    }
    
    const response = await fetch(new URL(url, `${process.env.WOOK_API_BASE_URL}`), { 
        headers: combinedHeaders,
        method,
        body: body ? JSON.stringify(body) : undefined,
        ...options
    });

    if (response.ok) {
        return response;
    } else if (response.status === 400 && method !== 'get') {
        const body = await response.json() as { errors?: Record<string, string[]> } | null;
        return json(body?.errors, { status: 400, statusText: 'Bad Request' });
    } else if (response.status === 401) {
        await authenticator.logout(request, { redirectTo: '/' });
        throw redirect('/');
    }

    throw response;
};

export { wookApiFetch };
