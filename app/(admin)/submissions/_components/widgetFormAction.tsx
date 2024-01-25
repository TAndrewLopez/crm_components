import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Check, Edit, X } from "lucide-react";

type FormActionProps = {
    active: boolean;
    handleToggle: () => void;
    handleSubmit: () => void;
    label: string;
    isPending: boolean;
};

export const WidgetFormAction = ({
    active,
    handleToggle,
    handleSubmit,
    label,
    isPending,
}: FormActionProps) => {
    if (active) {
        return (
            <div className="flex gap-x-3 items-center">
                <Hint delayAmount={0} label="Submit" side="top" asChild>
                    <Button
                        onClick={handleSubmit}
                        disabled={!active || isPending}
                        className="bg-emerald-500 hover:bg-emerald-500/50 h-8 2xl:h-6"
                        variant="link"
                        type="submit">
                        <Check className="w-4 h-4" />
                    </Button>
                </Hint>

                <Hint delayAmount={0} label="Cancel" side="top" asChild>
                    <Button
                        onClick={handleToggle}
                        disabled={!active || isPending}
                        className="bg-destructive hover:bg-destructive/50 h-8 2xl:h-6"
                        variant="link"
                        type="button">
                        <X className="w-4 h-4" />
                    </Button>
                </Hint>
            </div>
        );
    }

    return (
        <Button
            onClick={handleToggle}
            className="flex gap-x-3 bg-emerald-500 hover:bg-emerald-500/50 h-8 2xl:h-6"
            variant="link"
            type="submit">
            <p>{label}</p>
            <Edit className="w-4 h-4" />
        </Button>
    );
};
