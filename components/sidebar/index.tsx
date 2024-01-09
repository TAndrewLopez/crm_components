import { Header } from "./header";
import { FavoritePane } from "./paneFavorite";
import { MainPane } from "./paneMain";
import { UtilPane } from "./paneUtil";
import { Wrapper } from "./wrapper";
import { Footer } from "./footer";

type Props = {};

export const Sidebar = ({ }: Props) => {
    const username = "tandrewlopez";
    const imageURL = "";

    return (
        <Wrapper>
            <Header username={username} imageURL={imageURL} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <MainPane />
                <FavoritePane />
                <UtilPane />
            </div>
            <Footer />
        </Wrapper>
    );
};
