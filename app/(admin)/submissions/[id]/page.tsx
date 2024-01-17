import moment from "moment";

import { checkSubmissionViewStatusByID, getSubmissionByID } from "@/actions/submissions";
import { formatToUSNumber } from "@/lib/utils";
import { LOGS } from "@/temp/data";
import { ContactHeader } from "./_components/contactHeader";

type Props = {
    params: {
        id: string;
    };
};

const SingleSubmission = async ({ params }: Props) => {
    const submission = await getSubmissionByID(Number(params.id));
    const wasViewed = await checkSubmissionViewStatusByID(Number(params.id))
    console.log(wasViewed)
    if (!submission) return null;

    return (
        <div className="flex flex-col gap-x-5 pt-5 px-5 w-full">
            {/* SUBMISSION CONTACT HEADER */}
            <ContactHeader contactName={submission.name} />

            <div className="flex flex-col lg:flex-row gap-x-5 h-full overflow-y-auto">
                {/* LEFT SIDE PANE WITH CONTACT INFO AND ACTIVITY FEED */}
                <div className="flex flex-col gap-y-5">
                    <div className="max-w-lg">
                        <h3 className="font-semibold text-2xl">Contact Information</h3>
                        <div className="p-3 font-thin">
                            <div className="flex items-center gap-x-3">
                                <p>Phone Number:</p>
                                <p>{formatToUSNumber(String(submission.phone_number))}</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <p>Email Address</p>
                                <p>{submission.email}</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="font-semibold text-2xl">Activity Feed</h3>
                    <div className="space-y-3 max-w-sm flex-1 overflow-y-auto pr-2 pb-5">
                        <div className="flex flex-col gap-y-3">
                            {LOGS.map(({ description, username, createdAt }, i) => (
                                <div className="bg-neutral-900 p-2 rounded-sm" key={i}>
                                    <p className="text-sm font-extralight">{description}</p>
                                    <p className="text-right text-xs text-neutral-300 font-extralight">
                                        by{" "}
                                        {!!username
                                            ? username.toLowerCase()
                                            : submission.name.toLowerCase()}{" "}
                                        on {moment(createdAt).fromNow()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE PANE WITH SUBMISSION AND APPOINTMENT INFORMATION */}
                <div className="flex flex-1 flex-col gap-y-5">
                    <h3 className="font-semibold text-2xl">Submission Information</h3>
                    <div className="font-extralight">
                        <h3 className="font-normal text-lg">Tattoo Information</h3>
                        <hr className="bg-white/40 h-0.5 w-full my-2 max-w-xs" />
                        <div className="flex items-center gap-x-3">
                            <p>Placement: </p>
                            <p>{submission.placement}</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p>Size: </p>
                            <p>{submission.size}</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p>Color: </p>
                            <p>{submission.color}</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p>Description: </p>
                            <p>{submission.description}</p>
                        </div>

                    </div>
                    <div className="font-extralight">
                        <h3 className="font-normal text-lg">Initial Review Data</h3>
                        <hr className="bg-white/40 h-0.5 w-full my-2 max-w-xs" />
                        <p>Accepted and Rejected buttons</p>
                        <p>Requires Consultation Checkbox</p>
                        <p>No of Sessions Required Input box</p>
                    </div>
                    <div className="font-extralight">
                        <h3 className="font-normal text-lg">Appointment Data</h3>
                        <hr className="bg-white/40 h-0.5 w-full my-2 max-w-xs" />
                        <p>Consultation Date - If required</p>
                        <p>Appointment Date 1 8 no of sessions required</p>
                        <p>Deposit Paid?</p>
                        <p>Reference image uploaded?</p>
                        <p>Input for reference image</p>
                    </div>
                    <div className="font-extralight flex flex-col">
                        <h3 className="font-normal text-lg">Reference Photos</h3>
                        <hr className="bg-white/40 h-0.5 w-full my-2 max-w-xs" />
                        {
                            ["https://images.pistonheads.com/nimg/47438/blobid0.jpg",
                                "https://www.motortrend.com/uploads/2023/03/2023-porsche-911-gt3-rs-04.jpg"].map((href, i) => (
                                    <a className="underline hover:text-sky-500" href={href} key={i}>
                                        {href}
                                    </a>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSubmission;
