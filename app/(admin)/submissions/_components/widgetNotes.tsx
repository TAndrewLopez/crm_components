import { submissionNote } from "@prisma/client";
import moment from "moment";

import { WidgetWrapper } from "@/components/widgetWrapper";

type Props = {
    notes: submissionNote[];
};

export const NotesWidget = ({ notes }: Props) => {
    return (
        <WidgetWrapper className="flex-1" title="Notes" showSeparator>
            <div className="flex flex-col gap-y-2 h-64 xl:h-96 overflow-y-auto">
                <div className="space-y-3">
                    <ul className="flex flex-col gap-y-3 pr-2">
                        {notes.map((note) => (
                            <li
                                className="bg-primary-foreground p-2 rounded-sm"
                                key={note.id}>
                                <p className="text-sm font-extralight">{note.text}</p>
                                <div className="flex flex-nowrap gap-x-3">
                                    <p className="text-right text-xs text-neutral-300 font-extralight">
                                        {moment(note.created_at).fromNow()}
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
