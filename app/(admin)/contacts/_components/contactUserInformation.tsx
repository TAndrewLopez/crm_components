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
            <div className="flex flex-col gap-y-1 sm:flex-row gap-x-3">
                <p>Phone Number: </p>
                <p>{formatToUSNumber(phone_number)}</p>
            </div>
            <div className="flex flex-col gap-y-1 sm:flex-row gap-x-3">
                <p>Email: </p>
                <p>{email}</p>
            </div>
            <div className="flex flex-col gap-y-1 sm:flex-row gap-x-3">
                {
                    contact.role === 'client' && (
                        <>
                            <p>Member since: </p>
                            <p>{moment(created_at).format("MM/DD/yyyy")}</p>
                        </>
                    )
                }
                {contact.role === 'admin' &&
                    <>
                        <p>Hire Date: </p>
                        <p>{moment(created_at).format("MM/DD/yyyy")}</p>
                    </>
                }
                {contact.role === 'owner' &&
                    <>
                        <p>Account Created: </p>
                        <p>{moment(created_at).format("MM/DD/yyyy")}</p>
                    </>
                }

            </div>
        </WidgetWrapper>
    );
};

