import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

type CategoryProps = {
    id: number;
    name: string;
}

export default function AddItem({ categories }: { categories: CategoryProps[] }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, progress, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '',
        images: [] as File[],
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData('images', files);

            const previews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const removePreview = (index: number) => {
        const updatedPreviews = [...imagePreviews];
        const removedPreview = updatedPreviews.splice(index, 1);
        setImagePreviews(updatedPreviews);

        URL.revokeObjectURL(removedPreview[0]);

        const updatedFiles = [...data.images];
        updatedFiles.splice(index, 1);
        setData('images', updatedFiles);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Submit the form with the data (including images)
        post('/item', {
            data,
            onFinish: () => setIsSubmitting(false),  // Reset isSubmitting state after submission
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="leading-tight text-gray-800">
                    <h2>
                        <span className="text-gray-500">Inventory</span> &gt;{" "}
                        <Link href={route("category.index")}>Product Items</Link> &gt;{" "}
                        <span className="text-gray-500">Add Item</span>
                    </h2>
                    <div className="text-4xl font-semibold pt-4 mb-2">Add Product Item</div>
                    <p className="text-sm">Effortlessly manage your product categories.</p>
                </div>
            }
        >
            <Head title="Add Item" />

            <div className="py-6">
                <div className="me-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white shadow rounded-lg">
                            <h2 className="text-md mb-2 font-semibold">Add New Item</h2>
                            <hr />
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-2">
                                <div className="mb-2">
                                    <label htmlFor="name" className="mb-2 text-sm text-gray-700">Item Name</label>
                                    <input
                                        id="name"
                                        required
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="h-9 w-full rounded-lg text-sm leading-tight border-gray-300 focus:ring-0 flex-1"
                                        placeholder="Enter your Item Product"
                                    />
                                    {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="price" className="mb-2 text-gray-700 text-sm">Price</label>
                                    <div className="flex h-9 w-full rounded-lg text-sm leading-tight border border-gray-300 focus:ring-0 flex-1">
                                        <span className="flex select-none items-center pl-3 pr-1 text-gray-500 sm:text-sm">Rp. </span>
                                        <input
                                            id="price"
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            required
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            placeholder="Enter your Item Price"
                                        />
                                    </div>
                                    {errors.price && <span className="text-sm text-red-500">{errors.price}</span>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="category_id" className="mb-2 text-gray-700 text-sm">Category</label>
                                    <select
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="h-9 w-full rounded-lg text-sm leading-tight border-gray-300 focus:ring-0 flex-1"
                                    >
                                        <option value="" disabled>Select Item Category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <span className="text-sm text-red-500">{errors.category_id}</span>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="description" className="mb-2 text-gray-700 text-sm">Description</label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="h-24 w-full rounded-lg text-sm leading-tight border-gray-300 focus:ring-0 flex-1"
                                        placeholder="Enter your Item Product"
                                    />
                                    {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="images" className="mb-2 text-gray-700 text-sm">Item Images</label>
                                    <input
                                        id="images"
                                        onChange={handleFileChange}
                                        type="file"
                                        multiple
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                    />
                                    {errors.images && <span className="text-sm text-red-500">{errors.images}</span>}
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`preview-${index}`}
                                                className="w-full h-auto object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePreview(index)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end mb-4 mt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`bg-navy px-4 rounded-lg text-white text-sm py-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {isSubmitting ? "Submitting..." : "Create"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
