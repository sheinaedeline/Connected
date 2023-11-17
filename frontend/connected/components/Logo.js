"use client";
import Image from "next/image";
import logoExpanded from "assets/Logo Expanded.png";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Logo(params) {
    const router = useRouter();
    const { login, userType } = params;
    const [width, setWidth] = useState(0);
    const updateWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    };

     // Logo Home Button
    const handleHomeButton = () => {
        if (login === false) {
            router.push('/');
        } else {
            if (userType === 'company') {
                router.push('/company');
            } else if (userType === 'professional') {
                router.push('/professional');
            } else if (userType === 'admin') {
                router.push('/admin');
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        updateWidth();
    }, []);

    return (
        <Image src={logoExpanded} alt="Logo" width={width < 1024 ? "150" : "200"}
            height="auto" className="relative" onClick={handleHomeButton}/>
    )
};