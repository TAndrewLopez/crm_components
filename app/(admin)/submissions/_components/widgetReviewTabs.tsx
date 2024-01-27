import { cn } from "@/lib/utils";
import { appointmentStatus } from "@prisma/client";

type Props = {
    appointmentStatus: appointmentStatus | null;
    assignAppointmentStatus: (status: appointmentStatus | null) => void;
    editEnabled: boolean;
};

export const WidgetReviewTabs = ({
    appointmentStatus,
    assignAppointmentStatus,
    editEnabled,
}: Props) => {
    return (
        <div className="space-y-2">
            <p>Appointment Status:</p>

            <div className="bg-secondary w-fit p-2 rounded-md flex text-xs md:text-base font-semibold">
                <button
                    type="button"
                    onClick={() => {
                        assignAppointmentStatus(null);
                    }}
                    className={cn(
                        "px-2 py-1 rounded-md opacity-50",
                        appointmentStatus === null && "bg-popover/50",
                        appointmentStatus === null &&
                        editEnabled &&
                        "bg-popover opacity-100"
                    )}
                    disabled={!editEnabled}>
                    Unanswered
                </button>

                <button
                    type="button"
                    onClick={() => {
                        assignAppointmentStatus("accepted");
                    }}
                    className={cn(
                        "px-2 py-1 rounded-md opacity-50",
                        appointmentStatus === "accepted" && "bg-emerald-500/50",
                        appointmentStatus === "accepted" &&
                        editEnabled &&
                        "bg-emerald-500 opacity-100"
                    )}
                    disabled={!editEnabled}>
                    Accepted
                </button>

                <button
                    type="button"
                    onClick={() => {
                        assignAppointmentStatus("rejected");
                    }}
                    className={cn(
                        "px-2 py-1 rounded-md opacity-50",
                        appointmentStatus === "rejected" && "bg-destructive/50 ",
                        appointmentStatus === "rejected" &&
                        editEnabled &&
                        "bg-destructive opacity-100"
                    )}
                    disabled={!editEnabled}>
                    Rejected
                </button>
            </div>
        </div>
    );
};
