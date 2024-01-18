import {
    checkSubmissionViewStatusByID,
    getSubmissionByID,
} from "@/actions/submissions";
import { ContactHeader } from "./_components/contactHeader";
import { ActivityWidget } from "./_components/widgetActivity";
import { AppointmentWidget } from "./_components/widgetAppointment";
import { ContactWidget } from "./_components/widgetContact";
import { InitialWidget } from "./_components/widgetInitial";
import { ReferenceWidget } from "./_components/widgetReference";
import { ReviewWidget } from "./_components/widgetReview";
import { WidgetWrapper } from "./_components/widgetWrapper";
import { LOGS } from "@/temp/data";
import moment from "moment";

type Props = {
    params: {
        id: string;
    };
};

const SingleSubmission = async ({ params }: Props) => {
    const submission = await getSubmissionByID(Number(params.id));
    const wasViewed = await checkSubmissionViewStatusByID(Number(params.id));

    if (!submission) return null;

    return (
        <div className="h-full flex flex-col space-y-5">
            <ContactHeader contactName={submission.name} />

            <div className="flex-1 flex flex-col space-y-5 xl:flex-row xl:space-x-5 xl:space-y-0">
                <div className="flex flex-col xl:min-w-80 space-y-5">
                    <ContactWidget
                        email={submission.email}
                        phone_number={submission.phone_number}
                    />
                    <ActivityWidget client_name={submission.name} />
                </div>
                <div className="flex flex-col space-y-5 pb-5 xl:pb-0 overflow-x-auto">
                    <InitialWidget submission={submission} />
                    <ReviewWidget />
                    <AppointmentWidget />
                    <ReferenceWidget />
                </div>
            </div>
        </div>
    );
};

export default SingleSubmission;
