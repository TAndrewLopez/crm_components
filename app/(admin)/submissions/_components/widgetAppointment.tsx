import { WidgetWrapper } from "../../../../components/widgetWrapper"

export const AppointmentWidget = () => {
    return (
        <WidgetWrapper className="flex-1" title="Appointment Data" showSeparator>
            <div className="flex-1 font-extralight bg-neutral-900 p-4 rounded-md">
                <p>Consultation Date - If required</p>
                <p>Appointment Date & no of sessions required</p>
                <p>Deposit Paid?</p>
                <p>Reference image uploaded?</p>
                <p>Input for reference image</p>
            </div>
        </WidgetWrapper>
    )
}