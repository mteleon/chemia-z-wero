import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FLASK_CONICAL_PATHS } from "@/icons/flaskConicalPaths";

type Props = { isHovered?: boolean; className?: string; rotate?: boolean };
export default function AnimatedLogoIcon({ isHovered, className = "h-7 w-7", rotate = true }: Props) {
    return (
        <div className="relative">
            <div className={`bg-gradient-to-br from-[#F4B942] to-[#f7d486] p-2.5 rounded-2xl text-[#1A3B47] shadow-lg shadow-[#F4B942]/20 transition-all duration-300 relative z-10 ${isHovered && rotate ? 'rotate-[15deg] scale-110' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
                    {FLASK_CONICAL_PATHS.map((d, i) => <path key={i} d={d} />)}
                </svg>
            </div>
            <AnimatePresence>
                {isHovered && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0, y: 0, x: -2 }}
                            animate={{ opacity: [0, 1, 0], y: -20 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                            className="absolute -top-1 left-1/2 w-1.5 h-1.5 bg-[#D97745] rounded-full"
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 2, x: 4 }}
                            animate={{ opacity: [0, 1, 0], y: -15 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: 0.3, ease: "easeOut" }}
                            className="absolute top-0 left-1/2 w-1 h-1 bg-[#1A3B47] rounded-full"
                        />
                         <motion.div 
                            initial={{ opacity: 0, y: 1, x: -5 }}
                            animate={{ opacity: [0, 1, 0], y: -18 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.1, repeat: Infinity, delay: 0.1, ease: "easeOut" }}
                            className="absolute top-0 left-1/2 w-1 h-1 bg-[#F4B942] rounded-full"
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}