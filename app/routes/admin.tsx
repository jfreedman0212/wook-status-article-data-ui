import {NestedNavLayout} from "~/components/layout";
import {Link} from "~/components/links";
import {UploadIcon} from "@radix-ui/react-icons";

export default function Admin() {
    const navItems = [
        { to: 'awards', label: 'Awards' },
        { to: 'projects', label: 'Projects' },
        { to: 'nominators', label: 'Nominators' },
        { to: 'nominations', label: 'Nominations' },
    ];

    return (
        <NestedNavLayout heading='Manage Data' navItems={navItems}>
            <Link variant='secondary' to='/admin/nominations/import'>
                <UploadIcon aria-hidden />
                Upload CSV
            </Link>
        </NestedNavLayout>
    );
}
