import SideLink from '@/Components/SideLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import { BiSolidFoodMenu, BiSolidReport } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { FaComputer } from 'react-icons/fa6';
import { GiExitDoor } from 'react-icons/gi';
import { IoSettings } from 'react-icons/io5';
import { MdEmojiFoodBeverage, MdFoodBank, MdPayments, MdTableRestaurant } from 'react-icons/md';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="max-h-screen bg-gray-100 mx-auto max-w-full">
            <div className='flex justify-start gap-4'>
                <div className='pb-4 pt-6 px-6 bg-white shadow h-auto flex flex-col justify-between'>
                    <div>
                        <h2 className="font-bold text-2xl">Zai<span className="text-navy">POS</span></h2>

                        <div className='mt-6'>
                            <p className='text-gray-400 mb-2 font-semibold text-xs'>MAIN MENU</p>
                            <div className='flex flex-col gap-2'>
                                <SideLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <FaHome size={24} />
                                    Dashboard
                                </SideLink>

                                <SideLink href={route('profile.edit')} active={route().current('profile.edit')}>
                                    <FaComputer size={24} />
                                    Orders
                                </SideLink>

                                <SideLink href="" active={false} >
                                    <BiSolidFoodMenu size={24} />
                                    Transaction
                                </SideLink>
                            </div>

                            <p className='text-gray-400 mb-2 mt-4 font-semibold text-xs'>INVENTORY</p>
                            <div className='flex flex-col gap-2'>
                                <SideLink href={route('item.index')} active={route().current('item.index')}>
                                    <MdEmojiFoodBeverage size={24} />
                                    Items
                                </SideLink>

                                <SideLink href={route('category.index')} active={route().current('category.index')}>
                                    <MdFoodBank size={24} />
                                    Category
                                </SideLink>

                                <SideLink href="" active={false}>
                                    <MdPayments size={24} />
                                    Payment
                                </SideLink>

                                <SideLink  href="" active={false}>
                                    <MdTableRestaurant  size={24} />
                                    Table
                                </SideLink>
                            </div>

                            <p className='text-gray-400 mb-2 mt-4 font-semibold text-xs'>Setting</p>
                            <div className='flex flex-col gap-2'>
                                <SideLink href="" active={false}>
                                    <BiSolidReport  size={24} />
                                    Reporting
                                </SideLink>
                                <SideLink 
                                    href={route('logout')} 
                                    method="post"
                                    as="button" 
                                    active={false}
                                >
                                    <GiExitDoor  size={24} />
                                    Logout
                                </SideLink>
                            </div>
                        </div> 
                    </div>
    
                    <div className='flex justify-start items-center gap-2 p-1 border rounded-md mt-6'>
                        <img src="https://picsum.photos/200" alt="" className='w-9 rounded-md' />
                        <div className='text-2xs text-start'>
                            <h2 className='font-semibold text-md'>{user.name}</h2>
                            <p className='text-[7px]'>{user.email}</p>
                        </div>
                        <div>
                            <Link href={route('profile.edit')}>
                                <IoSettings size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col  h-screen justify-between'>
                    <main className=''>
                        {header && (
                            <header className="me-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                                <div className="">
                                    {header}
                                </div>
                            </header>
                        )}
                            
                        {children}
                    </main>

                    <footer className='text-center text-sm py-3 bg-white'>2024 Copyright ZaiPost by Zaicode</footer>
                </div>
            </div>
        </div>
    );
}
