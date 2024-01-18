"use client";

import moment from "moment";

import { LOGS } from "@/temp/data";
import { WidgetWrapper } from "./widgetWrapper";
import { useEffect, useRef, useState } from "react";
import { markSubAsRead } from "@/actions/submissions";

type Props = {
    client_name: string;
    submissionID: number;
    wasViewed: boolean;
};

export const ActivityWidget = ({
    client_name,
    submissionID,
    wasViewed,
}: Props) => {
    const [isClient, setIsClient] = useState(false);
    const div = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isClient && wasViewed === false) {
            const markAsRead = async () => {
                await markSubAsRead(submissionID);
            };
            markAsRead();
        }
    }, [isClient, submissionID, wasViewed]);

    useEffect(() => {
        if (div.current)
            div.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, []);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <WidgetWrapper title="Activity Feed">
            <div className="flex flex-col gap-y-2 h-96 overflow-y-scroll default-scrollbar">
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
                                    on {moment(createdAt).fromNow()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </WidgetWrapper>
    );
};
