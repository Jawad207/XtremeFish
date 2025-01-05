"use client"
// import React, { memo} from 'react'
// import { connect } from 'react-redux';
// import { ThemeChanger } from '@/shared/redux/action';

// function Layout({children, local_varaiable, ThemeChanger}:any) {
//   const customstyles :any=
//   {
//     ...(local_varaiable.colorPrimaryRgb !== '' && { '--primary-rgb': local_varaiable.colorPrimaryRgb }),
//     ...(local_varaiable.colorPrimary !== '' && { '--primary': local_varaiable.colorPrimary }),
//     ...(local_varaiable.bodyBg1 !== '' && { '--body-bg-rgb': local_varaiable.bodyBg1 }),
//     ...(local_varaiable.bodyBg2 !== '' && { '--body-bg-rgb2': local_varaiable.bodyBg2 }),
//     ...(local_varaiable.Light !== '' && { '--light-rgb': local_varaiable.bodyBg2 }),
//     ...(local_varaiable.Formcontrol !== '' && { '--form-control-bg': `rgb(${local_varaiable.bodyBg2})` }),
//     ...(local_varaiable.inputBorder !== '' && { '--input-border': `rgb(${local_varaiable.inputBorder})` }),
//     ...(local_varaiable.Graycolor !== '' && { '--gray-3': `rgb(${local_varaiable.Graycolor})` }),
//   };


//   return (
//     <>
//          <html
//             suppressHydrationWarning={true} 
//             dir={local_varaiable.dir}
//             data-theme-mode={'dark'}
//             data-header-styles={local_varaiable.dataHeaderStyles}
//             data-vertical-style={local_varaiable.dataVerticalStyle}
//             data-nav-layout={local_varaiable.dataNavLayout}
//             data-menu-styles={local_varaiable.dataMenuStyles}
//             data-toggled={local_varaiable.toggled}
//             data-nav-style={local_varaiable.dataNavStyle}
//             data-page-style={local_varaiable.dataPageStyle}
//             data-width={local_varaiable.dataWidth}
//             data-menu-position={local_varaiable.dataMenuPosition}
//             data-header-position={local_varaiable.dataHeaderPosition}
//             data-icon-overlay={local_varaiable.iconOverlay}
//             data-bg-img={local_varaiable.bgImg}
//             data-icon-text={local_varaiable.iconText}

//             //Styles
//             style={customstyles}>
//               <head>
//               <meta name="keywords" content="Xtreme Fish Admin panel" />
//               </head>
//              <body className={`${local_varaiable.body ? local_varaiable.body : ''}`}>
//               {children}
//              </body>
//           </html>
//     </>
//   )
// }

// const mapStateToProps = (state: any) => ({
//   local_varaiable: state
// });

// export default memo(connect(mapStateToProps, {ThemeChanger})(Layout));

"use client";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux"; // Using hooks instead of connect
import { ThemeChanger } from "@/shared/redux/action";

// Typing the props for clarity
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // Use Redux hooks instead of `connect`
  const local_varaiable = useSelector((state: any) => state); // Adjust the selector based on your state shape
  const dispatch = useDispatch();

  const customstyles: any = {
    ...(local_varaiable.colorPrimaryRgb !== "" && {
      "--primary-rgb": local_varaiable.colorPrimaryRgb,
    }),
    ...(local_varaiable.colorPrimary !== "" && {
      "--primary": local_varaiable.colorPrimary,
    }),
    ...(local_varaiable.bodyBg1 !== "" && {
      "--body-bg-rgb": local_varaiable.bodyBg1,
    }),
    ...(local_varaiable.bodyBg2 !== "" && {
      "--body-bg-rgb2": local_varaiable.bodyBg2,
    }),
    ...(local_varaiable.Light !== "" && {
      "--light-rgb": local_varaiable.bodyBg2,
    }),
    ...(local_varaiable.Formcontrol !== "" && {
      "--form-control-bg": `rgb(${local_varaiable.bodyBg2})`,
    }),
    ...(local_varaiable.inputBorder !== "" && {
      "--input-border": `rgb(${local_varaiable.inputBorder})`,
    }),
    ...(local_varaiable.Graycolor !== "" && {
      "--gray-3": `rgb(${local_varaiable.Graycolor})`,
    }),
  };


  return (
    <>
      <div
        suppressHydrationWarning={true}
        dir={local_varaiable.dir}
        data-theme-mode={"dark"}
        data-header-styles={local_varaiable.dataHeaderStyles}
        data-vertical-style={local_varaiable.dataVerticalStyle}
        data-nav-layout={local_varaiable.dataNavLayout}
        data-menu-styles={local_varaiable.dataMenuStyles}
        data-toggled={local_varaiable.toggled}
        data-nav-style={local_varaiable.dataNavStyle}
        data-page-style={local_varaiable.dataPageStyle}
        data-width={local_varaiable.dataWidth}
        data-menu-position={local_varaiable.dataMenuPosition}
        data-header-position={local_varaiable.dataHeaderPosition}
        data-icon-overlay={local_varaiable.iconOverlay}
        data-bg-img={local_varaiable.bgImg}
        data-icon-text={local_varaiable.iconText}
        style={customstyles}
      >
        <head>
          <meta name="keywords" content="Xtreme Fish Admin panel" />
        </head>
        <body className={local_varaiable.body || ""}>
          {children}
        </body>
      </div>
    </>
  );
};

export default memo(Layout);
