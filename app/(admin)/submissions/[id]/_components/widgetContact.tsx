import { formatToUSNumber } from "@/lib/utils";
import { WidgetWrapper } from "./widgetWrapper";

type Props = {
    email: string;
    phone_number: string;
};

export const ContactWidget = ({ email, phone_number }: Props) => {
    return (
        <WidgetWrapper className="flex-1" title="Contact Information" showSeparator>
            <div className="flex flex-col gap-y-2">
                <div>
                    <div className="flex items-center gap-x-5 font-thin">
                        <p>Phone Number:</p>
                        <p>{formatToUSNumber(String(phone_number))}</p>
                    </div>
                    <div className="flex items-center gap-x-3 font-thin">
                        <p>Email Address</p>
                        <p>{email}</p>
                    </div>
                </div>
            </div>
        </WidgetWrapper>
    );
};
