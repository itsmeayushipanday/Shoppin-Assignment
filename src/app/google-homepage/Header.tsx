// src/app/google-homepage/Header.tsx
import React from 'react';
import { TbGridDots } from 'react-icons/tb';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-5 text-sm text-gray-700">
            <div className="flex items-center space-x-4 ml-auto">
                <a href="https://mail.google.com" className="hover:underline">Gmail</a>
                <a href="https://images.google.com" className="hover:underline">Images</a>
                <div className="relative group">
                    <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer" title="Google Apps">
                        <TbGridDots size={24} />
                    </div>
                </div>
                <a href="#" className="hover:underline">Google Account</a>
            </div>
        </header>
    );
};

export default Header;
