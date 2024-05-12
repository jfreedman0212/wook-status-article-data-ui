import type { MetaFunction } from "@remix-run/node";
import {Form} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
      <Form action="/auth/auth0" method="post">
        <button>Login with Auth0</button>
      </Form>
  );
}
