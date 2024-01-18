import {
    checkSubmissionViewStatusByID,
    getSubmissionByID,
} from "@/actions/submissions";
import { ContactHeader } from "./_components/contactHeader";
import { ActivityWidget } from "./_components/widgetActivity";
import { AppointmentWidget } from "./_components/widgetAppointment";
import { ContactWidget } from "./_components/widgetContact";
import { InitialWidget } from "./_components/widgetInitialReview";
import { ReferenceWidget } from "./_components/widgetReferences";
import { ReviewWidget } from "./_components/widgetReview";
import { NotesWidget } from "./_components/widgetNotes";

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
            <ContactHeader submission={submission} />

            <div className="flex-1 flex flex-col space-y-5 xl:flex-row xl:space-x-5 xl:space-y-0">
                <div className="flex flex-col xl:min-w-80 space-y-5">
                    <ContactWidget submission={submission} />
                    <ActivityWidget
                        client_name={submission.name}
                        submissionID={submission.id}
                        wasViewed={wasViewed}
                    />
                </div>

                <div className="flex w-full flex-col gap-x-5 xl:flex-row space-y-5 xl:space-y-0 xl:pb-0 overflow-y-auto">
                    <div className="flex flex-col space-y-5 xl:min-w-96 xl:w-1/2">
                        <InitialWidget submission={submission} />
                        <ReviewWidget />
                        <AppointmentWidget />
                    </div>
                    <div className="flex flex-col space-y-5 xl:w-1/2 pb-5 xl:pb-0">
                        <NotesWidget />
                        <ReferenceWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSubmission;
