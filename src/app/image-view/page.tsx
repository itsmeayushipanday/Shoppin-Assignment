'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import Cropper from 'react-easy-crop';
import Image from 'next/image';
import Loader from "./Loader";
import "./image.module.css";

import dummy1 from "../../../public/dummy 1.png";
import dummy2 from "../../../public/dummy 2.png";
import dummy3 from "../../../public/dummy 3.avif";
import dummy4 from "../../../public/dummy 4.webp";
import dummy5 from "../../../public/dummy 5.jpeg";
import dummy6 from "../../../public/dummy 6.png";

const ImageViewPage = () => {
    const router = useRouter();
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const cropperRef = useRef<HTMLDivElement>(null);
    const [cropSize, setCropSize] = useState({ width: 100, height: 100 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const imageUrl = params.get('image');
        if (imageUrl) {
            setLoading(true);
            setTimeout(() => {
                setUploadedImage(decodeURIComponent(imageUrl));
                setLoading(false);
            }, 1000);
        }
    }, []);

    const dummyImages = [
        dummy1, dummy2, dummy3, dummy4, dummy5, dummy6
    ];

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            router.push(`/image-view?image=${encodeURIComponent(imageUrl)}`);
        }
    };

    const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, corner: string) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;

        const cropRect = cropperRef.current?.getBoundingClientRect();
        if (!cropRect) return;

        const startWidth = cropRect.width;
        const startHeight = cropRect.height;

        const onMouseMove = (e: MouseEvent) => {
            let newWidth = startWidth;
            let newHeight = startHeight;

            if (corner.includes('right')) {
                newWidth += e.clientX - startX;
            } else if (corner.includes('left')) {
                newWidth -= e.clientX - startX;
            }
            if (corner.includes('bottom')) {
                newHeight += e.clientY - startY;
            } else if (corner.includes('top')) {
                newHeight -= e.clientY - startY;
            }

            setCropSize({ width: newWidth, height: newHeight });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="w-full bg-white shadow-md sticky top-0 z-10 flex justify-between items-center px-6 py-4">
                <div className="flex items-center">
                    <Image src="/Google_logo.svg.webp" alt="Google Logo" width={74} height={24} />
                </div>

                <div className='flex items-center'>
                    <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        onChange={handleImageSelect}
                    />
                    <label className="text-gray-600">
                        <div className="flex items-center">
                            <MdOutlineFileUpload size={20} className="mr-1" />
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer text-gray-500 hover:underline text-sm"
                            >
                                Upload
                            </label>
                        </div>
                    </label>
                    <div className="relative group">
                        <div className="ml-2 mr-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer" title="Google Apps">
                            <TbGridDots size={20} color='gray' />
                        </div>
                    </div>
                    <a href="#" className="hover:underline text-sm text-slate-500">Google Account</a>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-grow overflow-hidden">
                {/* Left Side: Uploaded Image with Cropping Feature */}
                <div className="flex-1 flex justify-center items-center bg-black relative h-screen">
                    {loading ? (
                        <Loader />
                    ) : (
                        uploadedImage ? (
                            <div className="relative w-[400px] h-[400px]">
                                <Cropper
                                    image={uploadedImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    cropSize={cropSize}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    style={{ containerStyle: { width: '100%', height: '100%' } }}
                                />
                                <div ref={cropperRef} className="absolute top-0 left-0 w-full h-full">
                                    <div
                                        className="absolute top-[-5px] left-[-5px] w-3 h-3 bg-white rounded-full cursor-nwse-resize"
                                        onMouseDown={(e) => startResize(e, 'top-left')}
                                    ></div>
                                    <div
                                        className="absolute top-[-5px] right-[-5px] w-3 h-3 bg-white rounded-full cursor-nesw-resize"
                                        onMouseDown={(e) => startResize(e, 'top-right')}
                                    ></div>
                                    <div
                                        className="absolute bottom-[-5px] left-[-5px] w-3 h-3 bg-white rounded-full cursor-nesw-resize"
                                        onMouseDown={(e) => startResize(e, 'bottom-left')}
                                    ></div>
                                    <div
                                        className="absolute bottom-[-5px] right-[-5px] w-3 h-3 bg-white rounded-full cursor-nwse-resize"
                                        onMouseDown={(e) => startResize(e, 'bottom-right')}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-400">No image uploaded</p>
                        )
                    )}
                </div>

                {/* Right Side: Dummy Images */}
                <div className="flex-1 bg-gray-50 p-4 overflow-auto h-screen">
                    <div className="grid grid-cols-2 gap-4">
                        {dummyImages.map((image, index) => (
                            <div
                                key={index}
                                className="border rounded-lg overflow-hidden border-spacing-1 border-gray-200"
                            >
                                <Image
                                    src={image}
                                    alt={`Dummy ${index}`}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageViewPage;
