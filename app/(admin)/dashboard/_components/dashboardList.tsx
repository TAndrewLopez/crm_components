import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const SALES = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        payment: "1,999.00",
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        payment: "39.00",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        payment: "299.00",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        payment: "99.00",
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        payment: "199.00",
    },
];

export const DashboardList = () => {
    return (
        <Card className="xl:max-w-3xl w-full h-fit">
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-normal">
                    Recent Sales
                </CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
                {SALES.map(({ email, name, payment }, i) => (
                    <div className="flex justify-between items-center" key={i}>
                        <p className="bg-red-200 rounded-full h-8 w-8 mr-4"></p>
                        <div className="flex-1 flex flex-col truncate">
                            <p className="text-sm font-medium truncate">{name}</p>
                            <p className="text-sm font-normal text-muted-foreground truncate">{email}</p>
                        </div>
                        <p>${payment}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}