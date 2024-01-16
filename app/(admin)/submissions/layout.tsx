type Props = {
    children: React.ReactNode;
};

const SubmissionsLayout = ({ children }: Props) => {
    return (
        <div className="flex w-full">
            {children}
        </div>
    );
};

export default SubmissionsLayout;
