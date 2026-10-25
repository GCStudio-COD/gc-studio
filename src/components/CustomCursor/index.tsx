"use client";

import React, { useEffect, useState } from "react";

type CursorVariant = "default" | "nav" | "text";

export default function CustomCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorText, setCursorText] = useState("");
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [isVisible, setIsVisible] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            setMousePos({ x: e.clientX, y: e.clientY });

            // Check if hovering over an element that requests a custom cursor
            const el = e.target instanceof Element ? e.target : (e.target as Node)?.parentElement;
            const cursorElement = el?.closest?.('[data-cursor]');

            if (cursorElement) {
                const attr = cursorElement.getAttribute('data-cursor') || "";
                if (attr.toLowerCase() === "nav" || attr.toLowerCase() === "circle") {
                    setVariant("nav");
                    setCursorText("");
                } else if (attr.trim() !== "") {
                    setVariant("text");
                    setCursorText(attr);
                } else {
                    setVariant("default");
                    setCursorText("");
                }
            } else {
                setVariant("default");
                setCursorText("");
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            setVariant("default");
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isVisible]);

    return (
        <div
            className={`fixed top-0 left-0 pointer-events-none z-[100000] hidden md:block transition-opacity duration-200 ${isVisible && variant !== "nav" ? "opacity-100" : "opacity-0"}`}
            style={{
                transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`
            }}
        >
            <div
                className={`flex items-center justify-center rounded-full font-medium tracking-widest uppercase transition-all duration-300 ease-out flex-col text-center overflow-hidden
                    ${variant === "nav"
                        ? `w-[48px] h-[48px] bg-black/60 backdrop-blur-[2px] ${isMouseDown ? "scale-90" : "scale-100"} shadow-md`
                        : variant === "text"
                        ? `w-[84px] h-[84px] bg-zinc-900/90 text-white border border-white/10 shadow-2xl backdrop-blur-sm ${isMouseDown ? "scale-90" : "scale-100"}`
                        : `w-[12px] h-[12px] bg-zinc-900/90 text-white border border-white/20 ${isMouseDown ? "scale-75" : "scale-100"}`
                    }
                `}
            >
                {variant === "text" && (
                    <span className="text-[11px] font-semibold tracking-wider transition-opacity duration-200 select-none opacity-100 delay-100">
                        {cursorText}
                    </span>
                )}
            </div>
        </div>
    );
}
