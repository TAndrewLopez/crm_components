import type { Metadata } from "next";

import { isBookmark } from "@/actions/bookmarks";
import { getSubmissionByID, isSubmissionNew } from "@/actions/submissions";
import { SubmissionHeader } from "../_components/submissionHeader";
import { ActivityWidget } from "../_components/widgetActivity";
import { AppointmentWidget } from "../_components/widgetAppointment";
import { ContactWidget } from "../_components/widgetContact";
import { InitialWidget } from "../_components/widgetInitialReview";
import { NotesWidget } from "../_components/widgetNotes";
import { ReferenceWidget } from "../_components/widgetReferences";
import { ReviewWidget } from "../_components/widgetReview";
import { PageWrapper } from "@/components/pageWrapper";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
    params: {
        id: string;
    };
};

export const generateMetadata = async ({
    params: { id },
}: Props): Promise<Metadata> => {
    const submission = await getSubmissionByID(Number(id));

    return {
        title: `${submission?.email}`,
    };
};

const SingleSubmission = async ({ params: { id } }: Props) => {
    const submissionPromise = await getSubmissionByID(Number(id));
    const isNewPromise = await isSubmissionNew(Number(id));
    const [submission, isNew] = await Promise.all([submissionPromise, isNewPromise])
    const isBookmarkBool = await isBookmark(submission.id);


    // if (!submission) return <div>Loading?</div>

    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <div className="h-full flex flex-col space-y-5">
                <SubmissionHeader
                    isBookmark={isBookmarkBool}
                    submission={submission}
                />
                <div className="flex-1 flex flex-col space-y-5 xl:flex-row xl:space-x-5 xl:space-y-0">
                    <div className="flex flex-col xl:min-w-80 space-y-5">
                        <ContactWidget submission={submission} />
                        <div className="hidden xl:block">
                            <ActivityWidget
                                client_name={submission.name}
                                submissionID={submission.id}
                                isNew={isNew}
                            />
                        </div>
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
                            <div className="xl:hidden">
                                <ActivityWidget
                                    client_name={submission.name}
                                    submissionID={submission.id}
                                    isNew={isNew}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default SingleSubmission;
