import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
    crumbs: string[];
};

export const BreadCrumbs = ({ crumbs }: Props) => {
    const paths = crumbs
        .map((_, i) => {
            return `${crumbs.slice(0, i + 1).join("/")}`;
        })
        .slice(1);
    const lastIdx = crumbs.slice(1).length - 1;

    return (
        <div className="flex items-center">
            {crumbs.slice(1).map((c, i) => (
                <React.Fragment key={i}>
                    {i !== 0 && (
                        <span className="text-primary text-sm font-extralight px-1 capitalize">
                            /
                        </span>
                    )}
                    {i !== lastIdx && (
                        <Link
                            className="text-emerald-500 text-sm hover:text-primary font-semibold underline underline-offset-2 capitalize"
                            href={paths[i] ?? ""}>
                            {c}
                        </Link>
                    )}
                    {
                        i == lastIdx && (
                            <span className="text-nowrap text-primary text-sm hover:text-primary capitalize">{c}</span>
                        )
                    }
                </React.Fragment>
            ))}
        </div>
    );
};
