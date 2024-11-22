import '../css/app.css';
import './bootstrap';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { PaginationProps } from './Components/Pagination';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
export default function Pagination({ links }: PaginationProps) {
    return (
        <div className="flex justify-center mt-6 space-x-2">
            {links.map((link, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 rounded-md ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    disabled={!link.url}
                    onClick={() => link.url && router.get(link.url)}
                >
                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')} {/* Tampilkan simbol jika ada */}
                </button>
            ))}
        </div>
    )
}
