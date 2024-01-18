import { getFavoriteSubmissionsByUserID } from "@/actions/favorites";
import { Separator } from "../separator";
import { NavItem } from "./navItem";

type Props = {};

export const SidebarFavoriteLinks = async ({ }: Props) => {
    const favorites = await getFavoriteSubmissionsByUserID(11);

    if (!favorites) return null;

    return (
        <>
            <div className="flex justify-center flex-1 overflow-y-auto hidden-scrollbar">
                <ul className="py-4 flex flex-col gap-y-1 overflow-y-hidden">
                    {favorites.map(({ label, submission_id }) => (
                        <NavItem
                            name={label}
                            href={`/submissions/${submission_id}`}
                            key={submission_id}>
                            ⚪️
                        </NavItem>
                    ))}
                </ul>
            </div>
            <Separator className="bg-white/5" />
        </>
    );
};
