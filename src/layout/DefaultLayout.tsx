import { useState, ReactNode, forwardRef } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { pages } from '../utils/allPages';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = forwardRef<HTMLDivElement, DefaultLayoutProps>(
  ({ children }, ref) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = location.pathname;
    const isKnownPage = pages.some((page) => page.path === currentPath);

    if (!isKnownPage) {
      return <>{children}</>;
    }

    return (
      <div ref={ref} className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          {isKnownPage && currentPath != '/' && (
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-auto">
            {/* <!-- ===== Header Start ===== --> */}
            {(isKnownPage || currentPath === '/') && (
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                user={{ name: 'Arnauld Wilfride', role: 'Informaticien', profile: 'https://via.placeholder.com/150' }} />
            )}
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main className="flex-1 flex flex-col sm:mx-[20px] md:mx-[30px] lg:mx-[50px] xl:mx-[80px] sm:py-[20px] md:py-[30px] lg:py-[40px] xl:py-[50px]">
              {children}
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    );
  }
);

DefaultLayout.displayName = 'DefaultLayout';

export default DefaultLayout;
