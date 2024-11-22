import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ItemProps = {
    id: number
    name: string
    description: string
    price: number
    category: {
        id: number
        name: string
    }
}

type PaginationItem = {
    data: ItemProps[]
    links: {
        url: string | null
        label: string
        active: boolean
    }
}

export default function Item({ items, filters, flash }: {
    items: PaginationItem
    filters: {
        search: string
        isRoute: string
    }
    flash: {
        success?: string;
        error?: string;
    }
}){
    useEffect(() => {
        if (flash.success){
            toast.success(flash.success)
        }
        if (flash.error){
            toast.success(flash.error)
        }
    }, [flash])
    return(
       <AuthenticatedLayout
             header={
                <div className="leading-tight text-gray-800">
                    <h2>
                        <span className="text-gray-500">Inventory</span> &gt; <a href="">Items </a>
                    </h2>
                    <div className="text-4xl font-semibold pt-4 mb-2">Items </div>
                    <p className="text-sm">Manage your Product Items</p>
                </div>
            }
        >
            <Head title="Products" />
            <ToastContainer />

            <div className="py-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className='p-4 bg-white shadow rounded-lg'>
                        <div className='flex justify-end mb-4 items-center gap-3'>
                            <SearchInput initialSearch={filters?.search} isRoute='item.index'/>
                            <Link href={route('item.create')} className='bg-navy hover:bg-blue-900 text-white px-4 rounded-lg text-xs h-10 flex items-center'>Add</Link>
                        </div>

                        <table className="table-auto w-full">
                            <thead>
                                <tr className='h-10'>
                                    <th className='text-start font-semibold w-14'></th>
                                    <th className='text-start font-semibold'>Items</th>
                                    <th className='text-start font-semibold'>Description</th>
                                    <th className='text-start font-semibold'>Price</th>
                                    <th className='text-start font-semibold'>Category</th>
                                    <th className='text-start font-semibold'>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.data.length > 0 ? (
                                    items.data.map((item, i) => (
                                    <tr className='h-14 border-b' key={i}>
                                        <td className='text-center'>
                                            <input type="checkbox" />
                                        </td>
                                        <td className='flex gap-2 items-center mt-2'>
                                            <img src="https://picsum.photos/200" alt="" className='w-10 rounded-lg' />
                                            {item.name} 
                                        </td>
                                        <td>
                                            {item.description}
                                        </td>
                                        <td>
                                            {item.price}
                                        </td>
                                        <td>
                                            {item.category.name}
                                        </td>
                                        <td className='flex justify-start gap-2 items-center'>
                                            <Link href={route('category.edit', item.id)}>
                                                <MdEdit size={30} className='border p-1 rounded-lg bg-green-600 text-white hover:bg-green-700' />
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button onClick={() => []}>
                                                        <MdDeleteForever size={30} className="border p-1 rounded-lg bg-red-600 hover:bg-red-700 text-white" />
                                                    </button> 
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete Confirmation
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your
                                                            account and remove your data from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        {/* <AlertDialogAction
                                                            className='bg-red-600'
                                                        >
                                                            Delete
                                                        </AlertDialogAction> */}
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4 text-gray-500">
                                            Data is not available yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination links={Array.isArray(items.links) ? items.links : []} />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}