import ProfilePhoto from "./profile-photo";
import SearchModal from "./search-modal";
import MenuModal from "./menu-modal";
import Title from "./title";

export default function Header() {
    return (
        <div className="flex items-center gap-x-4 h-14 bg-slate-50 border-b border-slate-300 px-4 sticky top-0 z-10">
            <MenuModal />
            <Title />
            <SearchModal />
            <ProfilePhoto />
        </div>
    )
}