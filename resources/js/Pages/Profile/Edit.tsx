import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="leading-tight text-gray-800">
                    <span className='text-gray-500'>Setting</span> &gt; <a href="">Profile</a>
                    <h2 className='text-4xl font-semibold pt-4'>Dashboard</h2>
                    <p className='text-sm'>Update your account's profile information and email address.</p>
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="">
                            <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 mb-4'>
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl mb-6"
                                />
                            </div>

                            <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8'>
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>

                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
