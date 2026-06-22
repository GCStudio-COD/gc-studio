"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorText, setCursorText] = useState("");
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            // Check if hovering over an element that requests a custom cursor
            const target = e.target as HTMLElement;
            const cursorElement = target.closest('[data-cursor]');

            if (cursorElement) {
                const text = cursorElement.getAttribute('data-cursor') || "";
                setCursorText(text);
                setIsHovering(true);
            } else {
                setCursorText("");
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`
            }}
        >
            <div
                className={`flex items-center justify-center bg-zinc-800/95 shadow-lg text-white rounded-full font-bold tracking-widest uppercase transition-all duration-300 ease-out flex-col text-center overflow-hidden
                    ${isHovering ? 'w-[80px] h-[80px] scale-100 opacity-100' : 'w-[12px] h-[12px] scale-100 opacity-100'}
                `}
            >
                <span className={`text-[11px] transition-opacity duration-300 ${isHovering ? 'opacity-100 delay-100' : 'opacity-0 w-0 h-0 hidden'}`}>
                    {cursorText}
                </span>
            </div>
        </div>
    );
}
