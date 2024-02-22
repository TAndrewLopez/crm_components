import { MessageCircle, Mail, Bookmark } from "lucide-react";

export const ContactHeaderActions = () => {
    return (
        <>
            <button className="flex-1 flex flex-col items-center justify-center group space-y-1.5">
                <div className="bg-emerald-500 group-hover:bg-emerald-500/50 flex flex-col items-center justify-center px-2.5 py-2 rounded-full">
                    <MessageCircle className="text-emerald-500 group-hover:text-emerald-500/50 w-5 fill-foreground" />
                </div>
                <p className="text-emerald-500 font-semibold text-xs">Message</p>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center group space-y-1.5">
                <div className="bg-emerald-500 group-hover:bg-emerald-500/50 flex flex-col items-center justify-center px-2.5 py-2 rounded-full">
                    <Mail className="text-emerald-500 group-hover:text-emerald-500/50 w-5 fill-foreground" />
                </div>
                <p className="text-emerald-500 font-semibold text-xs">Mail</p>
            </button>
            {/* <button className="flex-1 flex flex-col items-center justify-center group space-y-1.5">
                <div className="bg-emerald-500 group-hover:bg-emerald-500/50 flex flex-col items-center justify-center px-2.5 py-2 rounded-full">
                    <Bookmark className="text-emerald-500 group-hover:text-emerald-500/50 w-5 fill-foreground" />
                </div>
                <p className="text-emerald-500 font-semibold text-xs">Bookmark</p>
            </button> */}
        </>
    );
};
