import moment from "moment";

import { formatToUSNumber } from "@/lib/utils";
import { WidgetWrapper } from "@/components/widgetWrapper";
import { SubmissionWithUser } from "@/lib/types";

type Props = {
    submission: SubmissionWithUser;
};

export const ContactWidget = ({ submission }: Props) => {
    const { email, preferred_pronouns, created_at, phone_number, user } = submission;

    return (
        <WidgetWrapper className="flex-1" title="Contact Information" showSeparator>
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-3">
                    {user && (
                        <div className="flex items-center gap-x-5 font-thin">
                            <p>Username: </p>
                            <p>{user.username}</p>
                        </div>
                    )}
                    <div className="flex items-center gap-x-5 font-thin">
                        <p>Phone Number: </p>
                        <p className="text-right">
                            {formatToUSNumber(String(phone_number))}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-5 font-thin">
                        <p>Email: </p>
                        <p>{email}</p>
                    </div>

                    <div className="flex items-center gap-x-5 font-thin">
                        <p>Preferred Pronouns:</p>
                        <p>{preferred_pronouns}</p>
                    </div>

                    {user && (
                        <div className="flex items-center gap-x-1 font-thin">
                            <p>Signed up</p>
                            <p>{moment(user.created_at).fromNow()}</p>
                        </div>
                    )}
                    <div className="flex items-center gap-x-1 font-thin">
                        <p>Submission created </p>
                        <p>{moment(created_at).fromNow()}</p>
                    </div>
                </div>
            </div>
        </WidgetWrapper>
    );
};
