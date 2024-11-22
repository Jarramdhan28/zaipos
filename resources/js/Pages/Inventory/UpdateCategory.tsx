import { Button } from "@/components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

type CategoryProps = {
    id: number;
    name: string;
};

export default function UpdateCategory ({ category }: { category: CategoryProps }) {
    const { data, setData, put, errors } = useForm({
        name: category.name,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('category.update', category.id));
    };

    return(
        <AuthenticatedLayout 
            header={
                <div className="leading-tight text-gray-800">
                    <h2>
                        <span className="text-gray-500">Inventory</span> &gt;{" "}
                        <Link href={route("category.index")}>Category</Link>{" "}
                        &gt;{" "}
                        <Link href="">
                            Update Category
                        </Link>
                    </h2>
                    <div className="text-4xl font-semibold pt-4 mb-2">
                        Update Category
                    </div>
                    <p className="text-sm">
                        Effortlessly manage your product categories.
                    </p>
                </div>
            }
        >

            <Head title="Update category" />

            <div className="py-6">
                <div className="me-auto max-w-xl space-y-6 sm:px-6 lg:px-8">
                    <div className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-lg mb-2">Update your Category</h2>
                        <hr />

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="h-9 rounded-xl text-sm leading-tight w-full border-slate-400 focus:ring-0"
                                />
                                {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-navy px-4 rounded-lg text-white text-sm py-2"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}