import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { MdAddBox, MdDeleteForever } from "react-icons/md";

export default function AddCategory() {
    const initialCategory = { name: "" };
    const [categories, setCategories] = useState([initialCategory]);

    // const { post, reset } = useForm({
    //     categories,
    // });

    const handleInputChange = (index: number, value: string) => {
        const updateCategories = [...categories];
        updateCategories[index].name = value;
        setCategories(updateCategories);
    };

    const addCategoryInput = () => {
        setCategories([...categories, initialCategory]);
    };

    const removeCategoryInput = (index: number) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        router.post("/category", { categories });
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="leading-tight text-gray-800">
                    <h2>
                        <span className="text-gray-500">Inventory</span> &gt;{" "}
                        <Link href={route("category.index")}>Category</Link>{" "}
                        &gt;{" "}
                        <Link href={route("category.create")}>
                            Add Category
                        </Link>
                    </h2>
                    <div className="text-4xl font-semibold pt-4 mb-2">
                        Add Category
                    </div>
                    <p className="text-sm">
                        Effortlessly manage your product categories.
                    </p>
                </div>
            }
        >
            <Head title="Add category" />

            <div className="py-6">
                <div className="me-auto max-w-xl space-y-6 sm:px-6 lg:px-8">
                    <div className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-lg mb-2">Add New Category</h2>
                        <hr />

                        <form onSubmit={handleSubmit} className="mt-4">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 mb-4"
                                >
                                    <input
                                        type="text"
                                        value={category.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        className="h-9 rounded-xl text-sm leading-tight border-slate-400 focus:ring-0 flex-1"
                                        placeholder={`Enter category name ${
                                            index + 1
                                        }`}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() =>
                                            removeCategoryInput(index)
                                        }
                                    >
                                        <MdDeleteForever size={24} />
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-lg text-gray-700 text-sm"
                                        onClick={addCategoryInput}
                                    >
                                        <MdAddBox size={24} />
                                    </button>
                                </div>
                            ))}

                            <div className="flex justify-end mb-4">
                                <button
                                    type="submit"
                                    className="bg-navy px-4 rounded-lg text-white text-sm py-2"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
