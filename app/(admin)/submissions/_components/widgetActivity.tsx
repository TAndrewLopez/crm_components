"use client";

import moment from "moment";
import { useEffect, useRef, useState } from "react";

import { setSubmissionStatus } from "@/actions/submissions";
import { LOGS } from "@/temp/data";
import { WidgetWrapper } from "./widgetWrapper";

type Props = {
    client_name: string;
    submissionID: number;
    isNew: boolean;
};

export const ActivityWidget = ({
    client_name,
    submissionID,
    isNew,
}: Props) => {
    const [isClient, setIsClient] = useState(false);
    const div = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isClient && isNew) {
            const markAsRead = async () => {
                await setSubmissionStatus(submissionID, 'read');
            };
            markAsRead();
        }
    }, [isClient, submissionID, isNew]);

    useEffect(() => {
        if (div.current)
            div.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, []);

    useEffect(() => setIsClient(true), []);

    return (
        <WidgetWrapper title="Activity Feed">
            <div className="flex flex-col gap-y-2 h-64 xl:h-96 overflow-y-scroll">
                <div ref={div} className="space-y-3">
                    <div className="flex flex-col gap-y-3">
                        {LOGS.map(({ description, username, createdAt }, i) => (
                            <div className="bg-primary-foreground p-2 rounded-sm" key={i}>
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
