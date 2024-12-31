'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Added FaTimes for the cross icon
import GoogleLens from '../../../public/Google_Lens.png';
import GoogleMic from '../../../public/Google_mic.png';
import { FcAddImage } from 'react-icons/fc';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const MainSection = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isImageSearch, setIsImageSearch] = useState(false); // State to toggle between search modes
    const router = useRouter(); // Initialize router

    // Default Trending Suggestions
    const trendingSuggestions = [
        'Trending: JavaScript',
        'Trending: Next.js',
        'Trending: React',
        'Trending: Tailwind CSS',
        'Trending: Google AI',
    ];

    // Fetch search suggestions (mock API for now, or replace with a real one)
    const fetchSuggestions = async (query: string) => {
        if (query.length > 2) {
            const response = await fetch(
                `https://api.duckduckgo.com/?q=${query}&format=json`
            );
            const data = await response.json();
            setSuggestions(data.RelatedTopics.map((item: any) => item.Text));
        } else {
            setSuggestions([]);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setQuery(value);
        fetchSuggestions(value);
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (!query) {
            setSuggestions(trendingSuggestions); // Show trending suggestions when no query
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
            if (!query) {
                setSuggestions([]);
            }
        }, 200); // Delay to prevent immediate closure when clicking a suggestion
    };

    const toggleToImageSearch = () => {
        setIsImageSearch(true); // Switch to image search mode
    };

    const toggleToTextSearch = () => {
        setIsImageSearch(false); // Switch back to text search mode
    };

    // Handle image selection and navigation
    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Create an object URL to preview the image
            const imageUrl = URL.createObjectURL(file);

            // Navigate to the new page with the image URL as a query parameter
            router.push(`/image-view?image=${encodeURIComponent(imageUrl)}`);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center mt-24'>
            {/* Google Logo */}
            <div className='mb-6'>
                <Image
                    src='/Google_logo.svg.webp'
                    alt='Google Logo'
                    width={272}
                    height={92}
                    priority
                />
            </div>

            {/* Conditional Rendering for Search Modes */}
            {!isImageSearch ? (
                // Text Search Bar
                <div className='w-full flex flex-col items-center gap-4'>
                    <div className='relative w-full max-w-3xl'>
                        <div
                            className={`relative transition-all duration-300 ease-in-out ${isFocused ? 'shadow-lg border-blue-500' : ''
                                }`}
                        >
                            <input
                                type='text'
                                value={query}
                                onChange={handleInputChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder='Search Google or type a URL'
                                className="w-full p-3 pl-12 pr-16 border rounded-full font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300"
                            />

                            {/* Left Icon */}
                            <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                                <FaSearch
                                    className='text-gray-500 hover:text-blue-500 cursor-pointer'
                                    size={16}
                                />
                            </div>

                            {/* Right Icons */}
                            <div className='absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-4'>
                                <Image
                                    src={GoogleMic}
                                    alt='Google Mic'
                                    width={30}
                                    height={30}
                                    className='cursor-pointer hover:opacity-80'
                                />
                                <Image
                                    src={GoogleLens}
                                    alt='Google Lens'
                                    width={30}
                                    height={30}
                                    className='cursor-pointer hover:opacity-80'
                                    onClick={toggleToImageSearch} // Switch to image search
                                />
                            </div>
                        </div>

                        {/* Suggestion Box */}
                        {isFocused &&
                            (suggestions.length > 0 || query.length === 0) && (
                                <div className='absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto'>
                                    <ul>
                                        {suggestions.length === 0 &&
                                            query.length === 0
                                            ? trendingSuggestions.map(
                                                (suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className='p-3 hover:bg-gray-100 cursor-pointer'
                                                        onClick={() =>
                                                            setQuery(
                                                                suggestion
                                                            )
                                                        }
                                                    >
                                                        {suggestion}
                                                    </li>
                                                )
                                            )
                                            : suggestions.map(
                                                (suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className='p-3 hover:bg-gray-100 cursor-pointer'
                                                        onClick={() =>
                                                            setQuery(
                                                                suggestion
                                                            )
                                                        }
                                                    >
                                                        {suggestion}
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                </div>
                            )}
                    </div>
                </div>
            ) : (
                // Image Search Interface
                <div className='w-6/12 flex flex-col items-center gap-4 relative shadow-lg rounded-3xl bg-white border border-gray-300'>
                    {/* Cross Sign */}
                    <button
                        className='absolute top-5 right-4 text-gray-500 hover:text-gray-800 text-lg'
                        onClick={toggleToTextSearch}
                    >
                        <FaTimes />
                    </button>

                    <div className='w-full text-center'>
                        {/* Heading */}
                        <h3 className='text-gray-700 block font-[Segoe UI, Tahoma, sans-serif] text-[16px] h-[28px] tracking-[0.1px] leading-[28px] mb-[14px] text-center mt-5'>
                            Search any image with Lens
                        </h3>

                        {/* Smaller Div with Dotted Border */}
                        <div className='w-[94%] mx-auto border mb-6 border-dashed border-gray-300 bg-[#F8F9FA] rounded-lg'>
                            {/* Drag and Upload Section */}
                            <div className='flex flex-col items-center  p-4 rounded-lg my-14'>
                                <input
                                    type='file'
                                    id='image-upload'
                                    className='hidden'
                                    onChange={handleImageSelect} // Handle image selection
                                />
                                <label className='text-gray-600 text-lg'>
                                    <div className='flex items-center'>
                                        <FcAddImage
                                            size={24}
                                            className='mr-2'
                                        />{' '}
                                        {/* Add margin-right to create space between icon and text */}
                                        <span>Drag an image here or </span>
                                        <label
                                            htmlFor='image-upload'
                                            className='ml-2 cursor-pointer text-blue-500 hover:underline'
                                        >
                                            upload a file
                                        </label>
                                    </div>
                                </label>
                            </div>

                            {/* OR Styling */}
                            <div className='flex items-center justify-center my-4 text-[rgb(71,71,71)] font-[Segoe UI, Tahoma, sans-serif] text-[14px]'>
                                <div className='flex-grow h-px bg-gray-300 mx-2'></div>
                                <span className='cursor-default'>OR</span>
                                <div className='flex-grow h-px bg-gray-300 mx-2'></div>
                            </div>

                            {/* Paste Image Link and Search Button */}
                            <div className='flex items-center justify-between  p-4 rounded-lg gap-4'>
                                <input
                                    type='text'
                                    placeholder='Paste image link'
                                    className='flex-1 py-2 px-6 border border-gray-300 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-500'
                                />
                                <button className='bg-white text-blue-500 px-4 py-2 rounded-3xl border border-gray-300 hover:bg-gray-100'>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainSection;