import { getSubmissionContactInfo } from "@/actions/submissions";
import { BreadCrumbWrapper } from "./_components/breadCrumbWrapper";
import { PageWrapper } from "@/components/pageWrapper";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Props = {
    params: {
        id: string;
    };
};

const CreatePage = async ({ params }: Props) => {
    const subContact = await getSubmissionContactInfo(Number(params.id));
    //   console.log(subContact);
    return (
        <PageWrapper className="flex flex-col gap-y-5 font-extralight p-4">
            <BreadCrumbWrapper name={subContact.name} />
        </PageWrapper>
    );
};

export default CreatePage;
