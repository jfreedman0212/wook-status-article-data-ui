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
    
    if (body && !combinedHeaders.has('Content-Type')) {
        combinedHeaders.set('Content-Type', 'application/json');
    }
    
    let bodyToSend: BodyInit | undefined = undefined;
    
    if (body && combinedHeaders.get('Content-Type') === 'application/json') {
        bodyToSend = JSON.stringify(body);
    } else if (body) {
        // if we explicitly set the content type to anything other than JSON, just pass the
        // body parameter as-is. this is primarily used for file uploads
        bodyToSend = body as BodyInit;
    }
    
    const response = await fetch(new URL(url, `${process.env.WOOK_API_BASE_URL}`), { 
        headers: combinedHeaders,
        method,
        body: bodyToSend,
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
