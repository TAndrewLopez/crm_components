import moment from "moment";
import { submission, user } from "@prisma/client";

import { formatToUSNumber } from "@/lib/utils";
import { WidgetWrapper } from "./widgetWrapper";

type Props = {
    submission: submission & {
        author?: user
    };
};

export const ContactWidget = ({
    submission,
}: Props) => {
    const { email, preferred_pronouns, created_at, phone_number } = submission

    return (
        <WidgetWrapper className="flex-1" title="Contact Information" showSeparator>
            <div className="flex flex-col gap-y-2">
                <div>
                    {
                        submission.author && <div className="flex items-center gap-x-5 font-thin">
                            <p>Username:</p>
                            <p>{submission.author.username}</p>
                        </div>
                    }
                    <div className="flex items-center gap-x-5 font-thin">
                        <p>Phone Number:</p>
                        <p>{formatToUSNumber(String(phone_number))}</p>
                    </div>
                    <div className="flex items-center gap-x-3 font-thin">
                        <p>Email Address</p>
                        <p>{email}</p>
                    </div>
                    <div className="flex items-center gap-x-5 font-thin">
                        <p>Preferred Pronouns:</p>
                        <p>{preferred_pronouns}</p>
                    </div>
                    {
                        submission.author && <div className="flex items-center gap-x-1 font-thin">
                            <p>Signed up</p>
                            <p>{moment(submission.author.created_at).fromNow()}</p>
                        </div>
                    }
                    <div className="flex items-center gap-x-1 font-thin">
                        <p>Submission created </p>
                        <p>{moment(created_at).fromNow()}</p>
                    </div>
                </div>
            </div>
        </WidgetWrapper>
    );
};
