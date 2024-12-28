// src/app/google-homepage/Footer.tsx
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-8 absolute bottom-0 left-0 right-0">
            <div className="flex justify-between px-12">
                {/* Left section */}
                <div className="flex space-x-6 text-sm text-gray-600">
                    <a href="#">Advertising</a>
                    <a href="#">Business</a>
                    <a href="#">How Search Works</a>
                </div>

                {/* Right section */}
                <div className="flex space-x-6 text-sm text-gray-600">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Settings</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
