'use client'

import { submission } from "@prisma/client";

import { WidgetWrapper } from "@/components/widgetWrapper";

type Props = {
    submission: submission
};

export const InitialWidget = ({ submission: { color, description, placement, size, } }: Props) => {
    return (
        <WidgetWrapper className="flex-1" title="Initial Information" showSeparator>
            <div className="bg-primary-foreground font-extralight rounded-md ">
                <div className="px-4 pt-4">
                    Widget Header
                </div>

                <div className="flex-1 p-4">
                    <div className="flex items-center gap-x-3">
                        <p className="">Placement: </p>

                        <p>{placement}</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <p>Size: </p>
                        <p>{size}</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <p>Color: </p>
                        <p>{color}</p>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <p>Description: </p>
                        <p>{description}</p>
                    </div>
                </div>
            </div>

        </WidgetWrapper>
    );
};
