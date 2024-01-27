import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type Props = {
    className?: string,
    children: React.ReactNode
    description: string;
    title: string;
    titleIcon: string;
}

export const DashboardWidget = ({ className, children, description, title, titleIcon, }: Props) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className='flex items-center justify-between text-lg font-normal'>
                    <p>{title}</p>
                    <div className='text-white/50'>{titleIcon}</div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
                <CardDescription className='text-xs font-light'>
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}