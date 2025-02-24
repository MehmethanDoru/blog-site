'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        if (!email) {
            setErrorMessage('Email is required');
            return false;
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            setErrorMessage('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setIsValid(false);
            return;
        }
        setIsValid(true);
        setErrorMessage('');
        // Register to newsletter
        toast.success('You have successfully subscribed to our newsletter!');
        setEmail('');
    };

    return (
        <div className="bg-[#fff] p-6 rounded-lg border shadow-sm h-full">
            <div className="flex items-center space-x-3 mb-6">
                <div className="bg-[#805aed] rounded-lg p-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
                gravida aliquet vulputate faucibus tristique odio.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsValid(true);
                            setErrorMessage('');
                        }}
                        className={`w-full px-4 py-3 rounded-lg border ${!isValid ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 ${!isValid ? 'focus:ring-red-500' : 'focus:ring-[#805aed]'} focus:border-transparent transition-colors`}
                    />
                    {!isValid && errorMessage && (
                        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#805aed] hover:bg-[#7950e9] text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Newsletter;