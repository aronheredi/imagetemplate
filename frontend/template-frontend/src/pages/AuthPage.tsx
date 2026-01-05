import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, register, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                await login({ email, password });
            } else {
                await register({ email, password, name });
            }
        } catch (err: Error) {
            console.error('Auth Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
                console.error('Error Status:', err.response.status);
            }
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className='w-full max-w-md bg-white border border-slate-200 flex flex-col gap-6 p-6 rounded-md shadow-sm mt-20 mx-auto justify-center items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-bold text-slate-900'>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className='text-slate-500 mt-2'>
                    {isLogin ? 'Please log in to continue.' : 'Sign up to get started.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col w-full gap-4'>
                {!isLogin && (
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name' className='text-sm font-medium text-slate-700'>
                            Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900'
                            required={!isLogin}
                        />
                    </div>
                )}

                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-sm font-medium text-slate-700'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900'
                        required
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='password' className='text-sm font-medium text-slate-700'>
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900'
                        required
                    />
                </div>

                {error && (
                    <div className='text-red-600 text-sm bg-red-50 p-2 rounded-md'>
                        {error}
                    </div>
                )}

                <button
                    type='submit'
                    disabled={isLoading}
                    className='w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
                </button>
            </form>

            <div className='text-center'>
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                    }}
                    className='text-sm text-slate-600 hover:text-slate-900'
                >
                    {isLogin
                        ? "Don't have an account? Sign up"
                        : 'Already have an account? Sign in'}
                </button>
            </div>
        </div>
    );
};
