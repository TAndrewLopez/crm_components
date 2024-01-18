import { Badge } from "@/components/ui/badge";
import { CircleUser } from "lucide-react";

type Props = {
    contactName: string;
};

export const ContactHeader = ({ contactName }: Props) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-x-3 mb-2">
                <CircleUser className="w-12 h-12" />
                <div className="flex items-end gap-x-5">
                    <div className="flex flex-col justify-between">
                        <p className="font-extralight">Contact</p>
                        <p className="font-thin text-2xl">{contactName}</p>
                    </div>
                    <div className="hidden xl:block pb-1.5 space-x-1.5">
                        <Badge variant="default">Contact</Badge>
                        <Badge variant="primary">Contact</Badge>
                        <Badge variant="highlight">Contact</Badge>
                        <Badge variant="destructive">Contact</Badge>
                        <Badge variant="outline">Contact</Badge>
                    </div>
                    <div className="xl:hidden space-x-1.5">
                        <Badge variant="default" className="rounded-full h-5"></Badge>
                        <Badge variant="primary" className="rounded-full h-5"></Badge>
                        <Badge variant="highlight" className="rounded-full h-5"></Badge>
                        <Badge variant="destructive" className="rounded-full h-5"></Badge>
                        <Badge variant="outline" className="rounded-full h-5"></Badge>
                    </div>
                </div>
            </div>
            <hr className="bg-white/40 h-0.5" />
        </div>
    );
};
