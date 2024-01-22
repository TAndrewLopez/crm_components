import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


import { DEFAULT_LOGIN_REDIRECT, adminRoutes, publicRoutes, } from '@/lib/routes'
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export const middleware = (request: NextRequest) => {
    const { nextUrl } = request;
    const paths = nextUrl.pathname.split("/")
    const isAdminRoute = adminRoutes.includes(paths[1]);

    if (isAdminRoute) {
        // console.log('admin route', nextUrl.pathname, paths, adminRoutes.includes(paths[1]))
        return null
    }
    // console.log('public route', nextUrl.pathname, paths)
    return null
}