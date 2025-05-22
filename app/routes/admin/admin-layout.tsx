
import { Outlet } from 'react-router'
// import {SidebarComponent} from "@syncfusion/ej2-react-navigations"
// import ej2Base from '@syncfusion/ej2-react-navigations';
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
// const { SidebarComponent } = ej2Base;
// import pkg from '@syncfusion/ej2-react-navigations';
// const {SidebarComponent} = pkg;
import { MobileSidebar, NavItems } from 'components'
const AdminLayout = () => {
  return (
    <div className="admin-layout">
        <MobileSidebar/>
        <aside className='w-full max-w-[270px] hidden lg:block'>
            <SidebarComponent width={270} enableGestures={false} height={100} className='h-full bg-white'>
                <NavItems/>
            </SidebarComponent>
        </aside>
        <aside className='children'>
            <Outlet/>
        </aside>
    </div>
  )
}

export default AdminLayout