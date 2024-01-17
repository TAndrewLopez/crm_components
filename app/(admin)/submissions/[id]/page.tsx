import { CircleUser } from "lucide-react";

import { getSubmissionByID } from "@/actions/submission";
import { Badge } from "@/components/ui/badge";
import { formatToUSNumber } from "@/lib/utils";
import { LOGS } from "@/temp/data";
import moment from "moment";

type Props = {
    params: {
        id: string;
    };
};

const SingleSubmission = async ({ params }: Props) => {
    const submission = await getSubmissionByID(Number(params.id));
    const isContact = false;
    const hasOpenAppointment = false;

    if (!submission) return null;

    return (
        <div className="flex flex-col w-full gap-x-5 pt-5 px-5">
            {/* SUBMISSION CONTACT HEADER */}
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3">
                    <CircleUser className="w-12 h-12" />
                    <div className="flex items-end gap-x-5">
                        <div className="flex flex-col justify-between">
                            <p className="font-extralight">Contact</p>
                            <p className="font-thin text-2xl">{submission.name}</p>
                        </div>
                        <div className="hidden lg:block pb-1.5 space-x-1.5">
                            <Badge variant="default">Contact</Badge>
                            <Badge variant="primary">Contact</Badge>
                            <Badge variant="highlight">Contact</Badge>
                            <Badge variant="destructive">Contact</Badge>
                            <Badge variant="outline">Contact</Badge>
                        </div>
                        <div className="lg:hidden space-x-1.5">
                            <Badge variant="default" className="rounded-full h-5"></Badge>
                            <Badge variant="primary" className="rounded-full h-5"></Badge>
                            <Badge variant="highlight" className="rounded-full h-5"></Badge>
                            <Badge variant="destructive" className="rounded-full h-5"></Badge>
                            <Badge variant="outline" className="rounded-full h-5"></Badge>
                        </div>
                    </div>
                </div>
                <hr className="bg-white/40 h-0.5 w-full my-2 max-w-2xl" />
            </div>

            <div className="flex flex-col lg:flex-row gap-x-5 h-full overflow-hidden">
                {/* LEFT SIDE PANE WITH CUSTOMER AND ACTIVITY FEED */}
                <div className="flex flex-col gap-y-5">
                    <div className="">
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
                    <div className="space-y-3 max-w-sm flex-1 overflow-y-scroll pr-2 pb-5">
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
                    <div>
                        <h3 className="font-normal text-lg">Tattoo Info</h3>
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
                    <div>
                        <h3 className="font-normal text-lg">Initial Review Data</h3>
                        <hr className="bg-white/40 h-0.5 w-full my-2 max-w-xs" />
                        <p>Accepted and Rejected buttons</p>
                        <p>Requires Consultation Checkbox</p>
                        <p>No of Sessions Required Input box</p>
                    </div>
                    <div>
                        <h3 className="font-normal text-lg">Appointment Data</h3>
                        <hr className="bg-white/40 h-0.5 w-full my-2 max-w-xs" />
                        <p>Consultation Date - If required</p>
                        <p>Appointment Date 1 8 no of sessions required</p>
                        <p>Deposit Paid?</p>
                        <p>Reference image uploaded?</p>
                        <p>Input for reference image</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSubmission;
