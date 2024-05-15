import {authLoader} from "~/api/auth-loader";
import {useLoaderData} from "@remix-run/react";
import {ProjectType, RawProject} from "~/models/project";
import {Link} from "~/components/links";

export const loader = authLoader({ url: 'projects' });

export default function Projects() {
    const rawProjects = useLoaderData<RawProject[]>();

    return (
        <section>
            <header>
                <h2>Projects</h2>
                <Link variant='secondary' to='new'>Add New</Link>
            </header>
            <ul>
                {rawProjects.map(p => (
                    <li key={p.id}>
                        <Link to={`${p.id}`}>
                            {p.type === ProjectType.INTELLECTUAL_PROPERTY ? <em>{p.name}</em> : <>{p.name}</>}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
