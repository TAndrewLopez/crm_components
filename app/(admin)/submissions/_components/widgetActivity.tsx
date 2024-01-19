"use client";

import moment from "moment";

import { LOGS } from "@/temp/data";
import { WidgetWrapper } from "./widgetWrapper";
import { useEffect, useRef, useState } from "react";
import { setSubStatus } from "@/actions/submissions";

type Props = {
    client_name: string;
    submissionID: number;
    isSeen: boolean;
};

export const ActivityWidget = ({
    client_name,
    submissionID,
    isSeen,
}: Props) => {
    const [isClient, setIsClient] = useState(false);
    const div = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isClient && isSeen === false) {
            const markAsRead = async () => {
                await setSubStatus(submissionID, 'read');
            };
            markAsRead();
        }
    }, [isClient, submissionID, isSeen]);

    useEffect(() => {
        if (div.current)
            div.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, []);

    useEffect(() => setIsClient(true), []);

    return (
        <WidgetWrapper title="Activity Feed">
            <div className="flex flex-col gap-y-2 h-96 overflow-y-scroll">
                <div ref={div} className="space-y-3">
                    <div className="flex flex-col gap-y-3">
                        {LOGS.map(({ description, username, createdAt }, i) => (
                            <div className="bg-neutral-900 p-2 rounded-sm" key={i}>
                                <p className="text-sm font-extralight">{description}</p>
                                <p className="text-right text-xs text-neutral-300 font-extralight">
                                    by{" "}
                                    {!!username
                                        ? username.toLowerCase()
                                        : client_name.toLowerCase()}{" "}
                                    {moment(createdAt).fromNow()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WidgetWrapper>
    );
};
