import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  customImage?: string | null;
  platform?: 'ios' | 'android';
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, customImage, platform = 'ios' }) => {
  return (
    <div className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl">
      {/* Notch - Only show for iOS */}
       {platform === 'ios' && (
        <div className="w-[148px] h-[18px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
       )}
      
      {/* Side Buttons */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      
      {/* Screen Container */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
        {/* Content Area */}
        <div className="w-full h-full pt-0 overflow-y-auto bg-gray-50 phone-scroll relative">
          {customImage ? (
            <img 
              src={customImage} 
              alt="Custom UI" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="pt-2 h-full">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};