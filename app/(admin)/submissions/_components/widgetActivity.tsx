"use client";

import moment from "moment";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { setSubmissionStatus } from "@/actions/submissions";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { LOGS } from "@/temp/data";

type Props = {
    client_name: string;
    submissionID: number;
    isNew: boolean;
};

export const ActivityWidget = ({ client_name, submissionID, isNew }: Props) => {
    const [isPending, startTransition] = useTransition();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (isClient && isNew) {
            const markAsRead = async () => {
                return await setSubmissionStatus(submissionID, "read");
            };

            startTransition(() => {
                markAsRead()
                    .then(() => toast("Submission marked as read."))
                    .catch((err) =>
                        toast.error("Something went wrong marking submission.")
                    );
            });
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
