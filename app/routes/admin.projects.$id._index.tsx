import {LoaderFunction, redirect} from "@remix-run/node";

export const loader: LoaderFunction = ({ params }) => redirect(`/admin/projects/${params.id}/nominations`);
