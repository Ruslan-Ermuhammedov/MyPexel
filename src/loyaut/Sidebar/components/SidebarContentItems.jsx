
import { useContext } from 'react'
import { MdOutlineSpaceDashboard } from 'react-icons/md'

// const sidebarItems = [
//     { title: "Platform Launch", icon: <MdOutlineSpaceDashboard />, color: "text-gray-700", id: 1 },
//     { title: "Marketing Plan", icon: <MdOutlineSpaceDashboard />, color: "text-gray-700", id: 2 },
//     { title: "Roadmap", icon: <MdOutlineSpaceDashboard />, color: "text-gray-700", id: 3 },
//     { title: "+ Create New Board", color: "text-blue-500", icon: <MdOutlineSpaceDashboard />, id: 4 },
// ]
function SidebarContentItems() {
    // tracking-[2.4px]
    return (
        <div className=' pt-6  w-full'>
            <input type="date" className=' rounded-lg border border-black' />
           <button>search</button>
            {/* <h1 className="ml-8 mb-5 text-base1 font-bold text-gray-700 uppercase ">
                All Boards (3)
            </h1>
            <div className='w-full pr-6'>
                {sidebarItems.map(item => (
                    <button  className={`px-8 rounded-r-full duration-300 py-4 w-full flex items-center gap-x-4 ${item.color} hover:bg-blue-500 hover:text-white `} key={item.id}>
                        {item.icon}
                        <span className={`font-bold text-sm  `} >{item.title}</span>
                    </button>
                ))}
            </div> */}
        </div>
    )
}
export default SidebarContentItems
