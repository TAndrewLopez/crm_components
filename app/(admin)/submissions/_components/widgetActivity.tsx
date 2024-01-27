import moment from "moment";

import { WidgetWrapper } from "@/components/widgetWrapper";
import { LOGS } from "@/temp/data";

type Props = {
    client_name: string;
};

export const ActivityWidget = ({ client_name }: Props) => {
    return (
        <WidgetWrapper title="Activity Feed" showSeparator>
            <div className="flex flex-col gap-y-2 h-64 xl:h-96 overflow-y-auto">
                <div className="space-y-3">
                    <ul className="flex flex-col gap-y-3 pr-2">
                        {LOGS.map(({ description, username, createdAt }, i) => (
                            <li className="bg-primary-foreground p-2 rounded-sm" key={i}>
                                <p className="text-sm font-semibold">{description}</p>
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
