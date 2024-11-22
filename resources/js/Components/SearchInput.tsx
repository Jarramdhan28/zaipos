import { router } from "@inertiajs/react";
import { useState } from "react";

const SearchInput = ({ initialSearch }: { initialSearch: string }) => {
    const [search, setSearch] = useState(initialSearch || "")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        router.get(route("category.index"), { search: value }, {
            preserveState: true, 
            replace: true,
        })
    };

    return ( 
        <input 
            type="text" 
            value={search}
            onChange={handleSearch}
            placeholder='Search Category' 
            className='h-10 w-60 text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:ring-0 focus:border-transparent active:border-slate-200' 
        />
    );
}
 
export default SearchInput;