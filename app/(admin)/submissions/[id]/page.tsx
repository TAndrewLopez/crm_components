import { Metadata } from "next";

import {
    getSubmissionByID,
    submissionIsRead,
} from "@/actions/submissions";
import { ContactHeader } from "../_components/contactHeader";
import { ActivityWidget } from "../_components/widgetActivity";
import { AppointmentWidget } from "../_components/widgetAppointment";
import { ContactWidget } from "../_components/widgetContact";
import { InitialWidget } from "../_components/widgetInitialReview";
import { NotesWidget } from "../_components/widgetNotes";
import { ReferenceWidget } from "../_components/widgetReferences";
import { ReviewWidget } from "../_components/widgetReview";
import { isFavoriteSubmission } from "@/actions/favorites";

type Props = {
    params: {
        id: string;
    };
};

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
    const submission = await getSubmissionByID(Number(id))

    return {
        title: `${submission?.email}`
    }
}

const SingleSubmission = async ({ params: { id } }: Props) => {
    const submission = await getSubmissionByID(Number(id));
    const isSeen = await submissionIsRead(Number(id));
    const isFav = await isFavoriteSubmission(submission.id)

    return (
        <div className="h-full flex flex-col space-y-5">
            <ContactHeader isFavorite={isFav} submission={submission} />

            <div className="flex-1 flex flex-col space-y-5 xl:flex-row xl:space-x-5 xl:space-y-0">
                <div className="flex flex-col xl:min-w-80 space-y-5">
                    <ContactWidget submission={submission} />
                    <ActivityWidget
                        client_name={submission.name}
                        submissionID={submission.id}
                        isSeen={isSeen}
                    />
                </div>

                <div className="flex w-full flex-col gap-x-5 xl:flex-row space-y-5 xl:space-y-0 xl:pb-0 overflow-y-auto">
                    <div className="flex flex-col space-y-5 xl:min-w-96 xl:w-1/2">
                        <InitialWidget submission={submission} />
                        <ReviewWidget />
                        <AppointmentWidget />
                    </div>
                    <div className="flex flex-col space-y-5 xl:w-1/2 pb-5 xl:pb-0">
                        <ReferenceWidget />
                        <NotesWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSubmission;