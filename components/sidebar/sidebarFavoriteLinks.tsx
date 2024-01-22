import { bookmark } from "@prisma/client";

import { Separator } from "../separator";
import { NavItem } from "./navItem";
import { StatusBadgeMobile } from "../statusBadgeMobile";

type Props = {
    bookmarks: bookmark[]
};

export const SidebarFavoriteLinks = async ({ bookmarks }: Props) => {
    return (
        <>
            <div className="mx-2 flex justify-center flex-1">
                <ul className="w-full py-2 flex flex-col gap-y-1">
                    {bookmarks.map(({ label, submission_id, status }) => (
                        <NavItem
                            name={label}
                            href={`/submissions/${submission_id}`}
                            key={submission_id}>
                            <StatusBadgeMobile status={status} size="lg" />
                        </NavItem>
                    ))}
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>
    );
};
