import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function SideLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & {active: boolean}){
    return(
        <Link 
            {...props}
            className={
                'flex gap-3 px-4 py-2 rounded-md transition duration-150 ease-in-out ' + (
                    active
                    ? 'bg-navy text-white'
                    : 'hover:bg-navy hover:text-white'
                ) + className
            }
            >
            {children}
        </Link>
    )
}
