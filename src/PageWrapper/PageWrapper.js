import React from 'react';

const PageWrapper = ({ children }) => {
  const wrapperStyle = {
    paddingTop: '100px', // Space for the floating navbar
    minHeight: '100vh',
    position: 'relative'
  };

  const mobileWrapperStyle = {
    '@media (max-width: 768px)': {
      paddingTop: '90px'
    }
  };

  return (
    <>
      <style>
        {`
          .page-wrapper {
            padding-top: 100px;
            min-height: 100vh;
            position: relative;
          }
          
          @media (max-width: 768px) {
            .page-wrapper {
              padding-top: 90px;
            }
          }
        `}
      </style>
      <div className="page-wrapper" style={wrapperStyle}>
        {children}
      </div>
    </>
  );
};

export default PageWrapper;