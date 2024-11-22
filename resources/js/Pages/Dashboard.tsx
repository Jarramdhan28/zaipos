import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaCheck } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { MdEmojiFoodBeverage, MdPendingActions } from 'react-icons/md';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div className="leading-tight text-gray-800">
                    <h2>
                        <span className='text-gray-500'>Main Menu</span> &gt; <a href="">Dashboard</a>
                    </h2>
                    <div className='text-4xl font-semibold pt-4'>Dashboard</div>
                    <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 bg-white shadow rounded-lg">
                            <div className='flex justify-between'>
                                <h2 className=''>Total Order</h2>
                                <HiShoppingCart size={35} className='text-navy rounded-full border p-2 hover:bg-navy hover:text-white'/>
                            </div>
                            <h2 className='text-3xl font-bold mb-2'>1712</h2>
                            <p>Ada Peningkatan</p>
                        </div>

                        <div className="p-4 bg-white shadow rounded-lg">
                            <div className='flex justify-between'>
                                <h2 className=''>Pending Orders</h2>
                                <MdPendingActions size={35} className='text-red-600 rounded-full border p-2 hover:bg-red-600 hover:text-white'/>
                            </div>
                            <h2 className='text-3xl font-bold mb-2'>231</h2>
                            <p>Ada Peningkatan</p>
                        </div>

                        <div className="p-4 bg-white shadow rounded-lg">
                            <div className='flex justify-between'>
                                <h2 className=''>Complited Orders</h2>
                                <IoMdCheckmarkCircle size={35} className='text-green-500 rounded-full border p-2 hover:bg-green-500 hover:text-white'/>
                            </div>
                            <h2 className='text-3xl font-bold mb-2'>1132</h2>
                            <p>Ada Peningkatan</p>
                        </div>

                        <div className="p-4 bg-white shadow rounded-lg">
                            <div className='flex justify-between'>
                                <h2 className=''>Total Products</h2>
                                <MdEmojiFoodBeverage size={35} className='text-yellow-600 rounded-full border p-2 hover:bg-yellow-600 hover:text-white'/>
                            </div>
                            <h2 className='text-3xl font-bold mb-2'>12</h2>
                            <p>Ada Peningkatan</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <div className='col-span-1 p-4 bg-white shadow rounded-lg'>
                            <h2 className='font-semibold mb-2'>Today Tansaction</h2>
                            <img src="https://picsum.photos/300/200?grayscale" alt="" className='w-full' />
                        </div>

                        <div className='col-span-1 p-4 bg-white shadow rounded-lg'>
                            <h2 className='font-semibold mb-2'>History Tansaction</h2>
                            
                            <div className='grid grid-cols-1 gap-2'>
                                <div className='flex justify-start items-center border p-2 rounded-md gap-4'>
                                    <div className='border p-1 rounded-md'>
                                        <FaCheck size={28} className='text-green-500'/>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className=''>
                                            <h2 className='text-md font-semibold'>Payment from #2121</h2>
                                            <p>Today, 18.00</p>
                                        </div>
                                        <div className=''>
                                            <h2 className='text-md font-semibold'>+ Rp. 10.000</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-start items-center border p-2 rounded-md gap-4'>
                                    <div className='border p-1 rounded-md'>
                                        <FaCheck size={28} className='text-green-500'/>
                                    </div>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className=''>
                                            <h2 className='text-md font-semibold'>Payment from #237</h2>
                                            <p>Today, 09.00</p>
                                        </div>
                                        <div className=''>
                                            <h2 className='text-md font-semibold'>+ Rp. 90.000</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
