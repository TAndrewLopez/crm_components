type Props = {
    children?: React.ReactNode
    count: number;
}

export const BadgeIcon = ({ children, count }: Props) => {
    let notificationCount;



    return (
        <div className="relative">
            {children}
            <div className="absolute -top-5 -end-2.5 border-transparent rounded-full bg-emerald-500 text-primary">
                {count}
            </div>
        </div>
    )
}