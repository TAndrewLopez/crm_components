"use client";

import moment from "moment";
import { useEffect, useState } from "react";

import { setSubmissionStatus } from "@/actions/submissions";
import { LOGS } from "@/temp/data";
import { WidgetWrapper } from "@/components/widgetWrapper";

type Props = {
    client_name: string;
    submissionID: number;
    isNew: boolean;
};

export const ActivityWidget = ({ client_name, submissionID, isNew }: Props) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (isClient && isNew) {
            const markAsRead = async () => {
                await setSubmissionStatus(submissionID, "read");
            };
            markAsRead();
        }
    }, [isClient, submissionID, isNew]);

    useEffect(() => setIsClient(true), []);

    return (
        <WidgetWrapper title="Activity Feed">
            <div className="flex flex-col gap-y-2 h-64 xl:h-96 overflow-y-auto">
                <div className="space-y-3">
                    <ul className="flex flex-col gap-y-3">
                        {LOGS.map(({ description, username, createdAt }, i) => (
                            <li className="bg-primary-foreground p-2 rounded-sm" key={i}>
                                <p className="text-sm font-extralight">{description}</p>
                                <div className="flex flex-nowrap gap-x-3">
                                    <p className="text-right text-xs text-neutral-300 font-extralight truncate">
                                        by{" "}
                                        {!!username
                                            ? username.toLowerCase()
                                            : client_name.toLowerCase()}{" "}
                                    </p>
                                    <p className="text-right text-xs text-neutral-300 font-extralight">
                                        {moment(createdAt).fromNow()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </WidgetWrapper>
    );
};
