"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-y-5 items-center justify-center h-full text-center">
            <div className="space-y-5">
                <p className="text-4xl">404</p>
                <p className="text-xl">
                    The page you were looking for couldn&apos;t be found.
                </p>
            </div>
            <Button variant="primary" onClick={() => router.back()}>
                Go Back
            </Button>
        </div>
    );
};

export default NotFoundPage;
