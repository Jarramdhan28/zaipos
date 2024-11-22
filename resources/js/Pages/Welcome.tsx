import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import HeroImg from '@/assets/img/hero.jpg'

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50">
                <div className="bg-beige pb-20 m-4 rounded-lg">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav className="flex justify-between py-2">
                            <div className="flex justify-center gap-6 items-center">
                                <h2 className="font-bold text-2xl">Zai<span className="text-navy">POS</span></h2>

                                <span>|</span>
                                <Link href='#' className="hover:text-black/70">Home</Link>
                                <Link href='#' className="hover:text-black/70">Features</Link>
                                <Link href='#' className="hover:text-black/70">About</Link>
                                <Link href='#' className="hover:text-black/70">Fricing</Link>
                                <Link href='#' className="hover:text-black/70">Contact Us</Link>
                            </div>
                            <div>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>

                        <main className='mt-36 flex justify-start gap-10'>
                            <div className='w-full mt-20'>
                                <h2 className='text-5xl font-bold mb-2'>Solusi POS Ideal untuk Kafe dan Restoran</h2>
                                <p>Kelola pesanan meja, stok bahan baku, hingga laporan penjualan harian dengan satu aplikasi yang dirancang khusus untuk kafe dan restoran.</p>

                                <div className='flex justify-start mt-2 gap-2'>
                                    <Link href='#' className='bg-brown py-2 px-3 rounded-md text-white'>Login</Link>
                                    <Link href='#' className=' border-brown border-2 py-2 px-3 rounded-md'>Demo Aplikasi</Link>
                                </div>
                            </div>

                            <div className='w-full'>
                                <div className=''>
                                    <img src={HeroImg} alt="" className='rounded-ss-[80px] w-4/5 m-auto'/>
                                </div>
                            </div>
                        </main>
                    </div>

                </div>
            </div>
        </>
    );
}
