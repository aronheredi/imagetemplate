import { useAuth0 } from '@auth0/auth0-react';

export const AuthPage = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div className='w-full max-w-md bg-white border border-slate-200 flex flex-col gap-6 p-6 rounded-md shadow-sm mt-20 mx-auto justify-center items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold text-slate-900'>Welcome </h1>
                <p className='text-slate-500 mt-2'>Please log in to continue.</p>
            </div>
            <div className='flex flex-col items-center w-full gap-4'>
                <button className='w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-200' onClick={() => loginWithRedirect()}>
                    Continue with Auth0
                </button>

            </div>
        </div>)
}
