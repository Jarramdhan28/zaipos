import { router } from "@inertiajs/react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

type Link = {
    url: string | null
    label: string
    active: boolean
}

type PaginationProps ={
    links: Link[]
}

export default function Pagination({ links }: PaginationProps){
    return(
        <div className="flex justify-end mt-6 space-x-2">
            {links.map((link, index) => (
                <button
                key={index}
                className={`
                    px-4 py-2 rounded-md text-xs font-semibold 
                    ${link.active ? 'bg-navy text-white' : 'bg-gray-200 text-gray-600'}
                    hover:bg-blue-900 hover:text-white transition-colors duration-200
                    ${!link.url && 'cursor-not-allowed opacity-50'}
                `}
                disabled={!link.url}
                onClick={() => link.url && router.get(link.url)}
                >
                    {link.label.includes('&laquo;') ? (
                        <MdChevronLeft />
                    ) : link.label.includes('&raquo;') ? (
                        <MdChevronRight />
                    ) : (
                        link.label
                    )}
                </button>
            ))}
        </div>
    )
}