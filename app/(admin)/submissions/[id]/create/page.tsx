

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
    params: {
        id: string,
    }
};

const CreatePage = async ({ params }: Props) => {
    console.log(params.id)

    return <div>Create Page</div>;
};

export default CreatePage