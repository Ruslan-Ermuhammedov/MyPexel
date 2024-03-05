import SidebarContents from "./components/SidebarContents"
import SidebarTop from "./components/SidebarTop"

function Sidebar() {
    return (
        <aside className='  h-screen bg-white   dark:bg-black-700 w-[300px] flex flex-col items-start'>
            <SidebarTop />
            <SidebarContents />
        </aside>
    )
}

export default Sidebar
