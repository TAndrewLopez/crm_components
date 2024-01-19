import { WidgetWrapper } from "./widgetWrapper"

export const NotesWidget = () => {
    return (
        <WidgetWrapper className="flex-1" title="Notes" showSeparator>
            <div className="flex-1 font-extralight bg-primary-foreground p-4 rounded-md">
                Notes
            </div>
        </WidgetWrapper>
    )
}