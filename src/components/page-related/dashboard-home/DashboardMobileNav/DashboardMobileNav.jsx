'use client';

// react
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// components
import CloseBtn from '@/components/shared/CloseBtn/CloseBtn';
import MobileMenuBtn from '@/components/shared/MobileMenuBtn/MobileMenuBtn';
import ButtonBtn from '@/components/shared/ButtonBtn/ButtonBtn';
import BrandLogo from '@/components/shared/BrandLogo/BrandLogo';
import DashboardNavContent from '../DashboardNavContent/DashboardNavContent';

// hook
import useDashboardMobileNav from '@/hooks/useDashboardMobileNav';
import useEscapeClose from '@/hooks/useEscapeClose';
import useFirebaseMethods from '@/hooks/useFirebaseMethods';
import useClickOutside from '@/hooks/useClickOutside';
import useStopScrolling from '@/hooks/useStopScrolling';

const DashboardMobileNav = ({
   modifyClasses = '',
   MenuBtnModifyClasses = '',
}) => {
   // initial functions and data extraction
   const {
      dashboardMobileNavOpen,
      openDashboardMobileNav,
      closeDashboardMobileNav,
   } = useDashboardMobileNav();
   const { logout } = useFirebaseMethods();
   const { stopYAxisScrolling } = useStopScrolling();

   useEffect(() => {
      stopYAxisScrolling(dashboardMobileNavOpen);
   }, [dashboardMobileNavOpen, stopYAxisScrolling]);

   const handleClickOutside = e => {
      if (!e.target.closest('.dashboard-mobilenav-focus')) {
         closeDashboardMobileNav();
      }
   };

   useClickOutside(dashboardMobileNavOpen, handleClickOutside);
   useEscapeClose(closeDashboardMobileNav);

   return (
      <div className={`dashboard-mobilenav-focus ${modifyClasses}`}>
         <MobileMenuBtn
            modifyClasses={MenuBtnModifyClasses}
            openNavFunction={openDashboardMobileNav}
         />

         {/* mobile navigation */}
         <nav
            className={`block h-screen fixed top-0 left-0 w-full xs:w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] 2xl:w-[20%] -translate-x-full origin-center transition-all duration-default z-40 overflow-x-hidden ${
               dashboardMobileNavOpen ? '!translate-x-0' : ''
            } p-6 bg-white`}
         >
            {/* close nav button */}
            <CloseBtn
               onClickFunction={closeDashboardMobileNav}
               modifyClasses='mb-customXs'
            />

            {/* brandlogo */}
            <BrandLogo
               onClickFunction={closeDashboardMobileNav}
               modifyClasses='h-[3rem] mb-12'
            />

            <DashboardNavContent />

            {/* signout button */}
            <ButtonBtn
               text='Sign Out'
               onClickFunction={() => {
                  logout();
                  closeDashboardMobileNav();
               }}
               modifyClasses='mt-customXs'
            />
         </nav>
      </div>
   );
};

DashboardMobileNav.propTypes = {
   modifyClasses: PropTypes.string,
   MenuBtnModifyClasses: PropTypes.string,
};

export default DashboardMobileNav;
