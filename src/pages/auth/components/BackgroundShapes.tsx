import React from 'react';

interface BackgroundShapesProps {
  isToggled: boolean;
}

const BackgroundShapes: React.FC<BackgroundShapesProps> = ({ isToggled }) => {
  return (
    <>
      <div className={`hidden md:block absolute right-0 top-0 h-150 w-212.5 bg-linear-to-tr from-dark-bg to-primary origin-bottom-right transition-transform duration-1500 ease-in-out z-10 
        ${isToggled ? 'rotate-0 skew-y-0 delay-500' : 'rotate-10 skew-y-40 delay-1600'}`}>
      </div>

      <div className={`hidden md:block absolute left-62.5 top-full h-175 w-212.5 bg-dark-bg border-t-4 border-primary origin-bottom-left transition-transform duration-1500 ease-in-out z-10
        ${isToggled ? '-rotate-11 -skew-y-41 delay-1200' : 'rotate-0 skew-y-0 delay-500'}`}>
      </div>
    </>
  );
};

export default BackgroundShapes;