import { submission } from "@prisma/client";

import { WidgetWrapper } from "../../../../components/widgetWrapper";

type Props = {
    submission: submission
};

export const InitialWidget = ({ submission: { color, description, placement, size, } }: Props) => {
    return (
        <WidgetWrapper className="flex-1" title="Initial Information" showSeparator>
            <div className="flex-1 font-extralight bg-primary-foreground p-4 rounded-md">
                <div className="flex items-center gap-x-3">
                    <p>Placement: </p>
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
        </WidgetWrapper>
    );
};
