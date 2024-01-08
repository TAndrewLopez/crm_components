import { Header } from "./header"
import { FavoritePane } from "./paneFavorite"
import { MainPane } from "./paneMain"
import { UtilPane } from "./paneUtil"
import { Wrapper } from "./wrapper"

type Props = {}

export const Sidebar = ({ }: Props) => {
    return (
        <Wrapper>
            <Header />
            <div>
                <MainPane />
                <FavoritePane />
                <UtilPane />
            </div>
        </Wrapper>
    )
}