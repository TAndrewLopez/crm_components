import { WidgetWrapper } from "./widgetWrapper"

export const ReferenceWidget = () => {
    return (
        <WidgetWrapper className="flex-1" title="Reference Photos" showSeparator>
            <div className="flex-1 font-extralight bg-neutral-900 p-4 rounded-md flex flex-col">
                {[
                    "https://images.pistonheads.com/nimg/47438/blobid0.jpg",
                    "https://www.motortrend.com/uploads/2023/03/2023-porsche-911-gt3-rs-04.jpg",
                ].map((href, i) => (
                    <a className="underline hover:text-sky-500 truncate" href={href} key={i}>
                        {href}
                    </a>
                ))}
            </div>
        </WidgetWrapper>
    )
}