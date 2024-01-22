import moment from "moment";

import { WidgetWrapper } from "@/components/widgetWrapper";
import { ContactUser } from "@/lib/types";
import { formatToUSNumber } from "@/lib/utils";

type Props = {
    contact: ContactUser;
};

export const ContactUserInformation = ({ contact }: Props) => {
    const { created_at, email, phone_number } = contact;
    return (
        <WidgetWrapper title="Contact Information" showSeparator>
            <div className="flex flex-col sm:flex-row gap-x-3">
                <p>Phone Number: </p>
                <p>{formatToUSNumber(phone_number)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-3">
                <p>Email: </p>
                <p className="truncate">{email}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-3">
                <p>Hire Date: </p>
                <p>{moment(created_at).format("MM/DD/yyyy")}</p>
            </div>
        </WidgetWrapper>
    );
};
