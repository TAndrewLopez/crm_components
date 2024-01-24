'use client'

import { BreadCrumbs } from "@/components/breadCrumbs"
import { usePathname } from "next/navigation"

type Props = {
    name: string;
}

export const BreadCrumbWrapper = ({ name }: Props) => {
    const splitPathname = usePathname().split("/");
    const lastIdx = splitPathname.length - 1
    const crumbs = [...splitPathname.slice(0, -2), name, splitPathname[lastIdx]];

    return (
        <BreadCrumbs crumbs={crumbs} hrefs={splitPathname} />
    )
}