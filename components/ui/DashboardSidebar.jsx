"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Burger Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-40 h-screen bg-white
        transform transition-transform duration-200 ease-in-out
        lg:relative lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-[280px] border-r
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/Dandi-logo.svg" alt="Dandi" className="h-8" />
          </Link>
        </div>

        {/* Account Selector */}
        <div className="px-4 py-3 border-b">
          <button className="w-full flex items-center justify-between px-2 py-1.5 text-[15px]">
            <span>Personal</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-0.5">
          <Link
            href="/overview"
            className={`flex items-center space-x-3 px-2 py-1.5 rounded-md ${
              isActive('/overview') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z" />
            </svg>
            <span className="text-[15px]">Overview</span>
          </Link>

          <Link
            href="/research-assistant"
            className={`flex items-center space-x-3 px-2 py-1.5 rounded-md ${
              isActive('/research-assistant') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
            </svg>
            <span className="text-[15px] text-gray-500">Research Assistant</span>
          </Link>

          <Link
            href="/research-reports"
            className="flex items-center space-x-3 px-2 py-1.5 rounded-md text-gray-500 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 16H5V5h14v14z" />
              <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" />
            </svg>
            <span className="text-[15px]">Research Reports</span>
          </Link>

          <Link
            href="/playground"
            className="flex items-center space-x-3 px-2 py-1.5 rounded-md text-gray-500 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z" />
              <path d="m9.293 9.293-3 3a.999.999 0 0 0 0 1.414l3 3 1.414-1.414L8.414 13l2.293-2.293-1.414-1.414zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414 3-3a.999.999 0 0 0 0-1.414l-3-3z" />
            </svg>
            <span className="text-[15px]">API Playground</span>
          </Link>

          <Link
            href="/invoices"
            className="flex items-center space-x-3 px-2 py-1.5 rounded-md text-gray-500 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 14H4V6h16v12z" />
              <path d="M6.5 11h3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5zM6 14h6v2H6z" />
            </svg>
            <span className="text-[15px]">Invoices</span>
          </Link>

          <Link
            href="/documentation"
            className="flex items-center space-x-3 px-2 py-1.5 rounded-md text-gray-500 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 16H5V5h14v14z" />
              <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" />
            </svg>
            <span className="text-[15px]">Documentation</span>
            <svg className="h-3.5 w-3.5 ml-auto" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
            </svg>
          </Link>
        </nav>
      </div>
    </>
  );
} 