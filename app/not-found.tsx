"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col gap-y-5 items-center justify-center h-full text-center">
            <div className="space-y-5">
                <p className="text-4xl">404</p>
                <p className="text-xl">
                    The page you were looking for couldn&apos;t be found.
                </p>
            </div>

            <Link href="/">
                <Button variant="primary">Back Home</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
