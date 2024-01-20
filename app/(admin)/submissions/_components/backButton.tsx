"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
    const router = useRouter();

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="bg-primary-foreground/80 hover:bg-emerald-500 transition-all rounded-full p-1">
                <ChevronLeft />
            </button>
        </div>
    );
};
