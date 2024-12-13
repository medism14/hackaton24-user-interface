import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faMoneyBillWave,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-gradient-to-b from-black to-gray-900 shadow-2xl transition-transform duration-300 ease-in-out dark:from-boxdark dark:to-gray-800 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className="flex items-center justify-center flex-grow">
          <img
            src="/logo-no-background.png"
            alt="Logo"
            className="w-auto h-12 max-w-[180px] transition-transform duration-200 hover:scale-105"
          />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block p-1.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 lg:hidden"
        >
          <svg
            className="fill-current text-gray-200"
            width="20"
            height="18"
            viewBox="0 0 20 18"
          >
            <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-bold tracking-wider text-gray-400 uppercase">
              Menu
            </h3>
            <ul className="mb-6 flex flex-col gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary/70 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`
                }
              >
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110`}
                />
                <span className="font-semibold">Dashboard</span>
              </NavLink>

              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary/70 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`
                }
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="font-semibold">Users</span>
              </NavLink>

              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary/70 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`
                }
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="font-semibold">Projects</span>
              </NavLink>

              <NavLink
                to="/payments"
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary/70 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`
                }
              >
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="font-semibold">Payments</span>
              </NavLink>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
