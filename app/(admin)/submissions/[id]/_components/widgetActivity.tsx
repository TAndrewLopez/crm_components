import moment from "moment";

import { LOGS } from "@/temp/data";
import { WidgetWrapper } from "./widgetWrapper";

type Props = {
    client_name: string;
};

export const ActivityWidget = ({ client_name }: Props) => {
    return (

        <WidgetWrapper className="" title="Activity Feed">
            <div className="flex flex-col gap-y-2 h-96 overflow-y-scroll default-scrollbar">
                <div className="space-y-3">
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

/*
<WidgetWrapper className="default-scrollbar" title="Activity Feed">
    <ScrollArea className="h-96 rounded-md default-scrollbar">
        <div className="flex flex-col gap-y-2">
            <div className="space-y-3">
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
    </ScrollArea>
</WidgetWrapper>
*/