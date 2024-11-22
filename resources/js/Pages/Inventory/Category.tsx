import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type CategoryProps = {
    id: number
    name: string
    created_at: string
}

type PaginationCategory = {
    data: CategoryProps[]
    links: {
        url: string | null
        label: string
        active: boolean
    }
}
export default function Category ({ categories, filters, flash}: {
    categories: PaginationCategory
    filters: {
        search: string
    }
    flash: {
        success?: string;
        error?: string;
    };
}){
    useEffect(() => {
        if (flash.success){
            toast.success(flash.success)
        }
        if (flash.error){
            toast.success(flash.error)
        }
    }, [flash])

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDelete = (id: number) => {
        setSelectedCategoryId(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedCategoryId) {
            router.post(route('category.destroy', selectedCategoryId), {
                _method: 'DELETE',
            });
            setIsDialogOpen(false);
        }
    };
   

    return(
        <AuthenticatedLayout
             header={
                <div className="leading-tight text-gray-800">
                    <h2>
                        <span className="text-gray-500">Inventory</span> &gt; <a href="">Category</a>
                    </h2>
                    <div className="text-4xl font-semibold pt-4 mb-2">Category</div>
                    <p className="text-sm">Manage your Category Items</p>
                </div>
            }
        >
            <Head title="Category" />
            <ToastContainer />

            <div className="py-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className='p-4 bg-white shadow rounded-lg'>
                        <div className='flex justify-end mb-4 items-center gap-3'>
                            <SearchInput initialSearch={filters?.search}/>
                            <Link href={route('category.create')} className='bg-navy hover:bg-blue-900 text-white px-4 rounded-lg text-xs h-10 flex items-center'>Add</Link>
                        </div>

                        <table className="table-auto w-full">
                            <thead>
                                <tr className='h-10'>
                                    <th className='text-start font-semibold w-14'></th>
                                    <th className='text-start font-semibold'>Name Category</th>
                                    <th className='text-start font-semibold'>Number of Products</th>
                                    <th className='text-start font-semibold'>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.data.length > 0 ? (
                                    categories.data.map((category, i) => (
                                    <tr className='h-10 border-b' key={i}>
                                        <td className='text-center'>
                                            <input type="checkbox" />
                                        </td>
                                        <td>{category.name}</td>
                                        <td>2</td>
                                        <td className='flex justify-start gap-2 items-center'>
                                            <Link href={route('category.edit', category.id)}>
                                                <MdEdit size={30} className='border p-1 rounded-lg bg-green-600 text-white hover:bg-green-700' />
                                            </Link>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button onClick={() => handleDelete(category.id)}>
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
                                                        <AlertDialogAction
                                                            onClick={confirmDelete}
                                                            className='bg-red-600'
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
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
                        <Pagination links={Array.isArray(categories.links) ? categories.links : []} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}