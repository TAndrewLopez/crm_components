import { WidgetWrapper } from "./widgetWrapper"

export const ReviewWidget = () => {
    return (
        <WidgetWrapper className="flex-1" title="Initial Review Data" showSeparator>
            <div className="flex-1 font-extralight bg-neutral-900 p-4 rounded-md">
                <p>Accepted and Rejected buttons</p>
                <p>Requires Consultation Checkbox</p>
                <p>No of Sessions Required Input box</p>
            </div>
        </WidgetWrapper>
    )
}