import React, { forwardRef } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { Tenant, LayoutId, AppType } from '../types';

interface ScreenshotWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  id?: string;
  customImage?: string | null;
  width?: number; // Logical width (e.g. 414)
  height?: number; // Logical height (e.g. 896)
  scale?: number;
  tenant: Tenant;
  layout: LayoutId;
  appType?: AppType;
  platform?: 'ios' | 'android';
}

export const ScreenshotWrapper = forwardRef<HTMLDivElement, ScreenshotWrapperProps>(({ 
  title, 
  subtitle, 
  children, 
  id, 
  customImage, 
  width = 414, 
  height = 896, 
  scale = 1,
  tenant,
  layout,
  appType = 'customer',
  platform = 'ios'
}, ref) => {

  const isMerchant = appType === 'merchant';

  // --- UNIFIED SPACING LOGIC (Base: 5.5" / 16:9) ---
  // We ignore screen height for layout decisions to ensure consistency.
  // The 6.5" export will simply have more vertical whitespace/background 
  // due to the container height, but the internal composition remains the same.

  // Top Padding: 
  // Unified to pt-14 (56px logical) for Customer, slightly more for Merchant.
  const paddingTopClass = isMerchant ? "pt-20" : "pt-14"; 

  // Vertical Rhythm (Gap between text and phone):
  const titleToPhoneGap = isMerchant ? "mb-12" : "mb-8";

  // Phone Styles (Unified)
  // Standardized scaling to prevent "zoomed in" look on taller screens.
  const phoneScaleClass = "scale-[0.9]";
  const bigPhoneScaleClass = "scale-[1.1]";
  
  // Phone Translation
  // Keep consistent offset.
  const phoneTranslateClass = "translate-y-6";
  const bigPhoneTranslateClass = "translate-y-12";

  // Container Padding (Horizontal)
  const horizontalPadding = "px-10";

  // Typography - Plus Jakarta Sans
  const titleClass = "text-gray-900 text-3xl font-extrabold mb-4 leading-[1.15] tracking-tight break-words";
  const subtitleClass = "text-gray-500 text-lg font-medium leading-snug max-w-[320px] break-words";

  const renderLayoutContent = () => {
    switch (layout) {
      case 'split_brand':
        return (
          <>
            {/* Colored Header Background - Covers full height */}
            <div 
              className="absolute top-0 left-0 right-0 z-0 rounded-b-[3.5rem]"
              style={{ backgroundColor: tenant.primaryColor, height: '100%' }}
            />
            
            {/* Content Container - Justify Center to float in middle of taller canvas */}
            <div className={`w-full h-full flex flex-col ${paddingTopClass} ${horizontalPadding} relative z-10 justify-center`}>
              <div className={`text-center ${titleToPhoneGap} w-full flex flex-col items-center shrink-0`}>
                <h2 className="text-white text-3xl font-extrabold mb-4 leading-[1.1] tracking-tight drop-shadow-sm break-words">
                  {title}
                </h2>
                <p className="text-white/90 text-lg font-medium leading-snug max-w-[320px] mx-auto break-words">
                  {subtitle}
                </p>
              </div>
              <div className="flex justify-center items-end relative w-full shrink-0">
                <div className={`transform origin-bottom shadow-2xl rounded-[2.5rem] transition-transform duration-200 ${phoneScaleClass} ${phoneTranslateClass}`}>
                   <PhoneFrame customImage={customImage} platform={platform}>{children}</PhoneFrame>
                </div>
              </div>
            </div>
          </>
        );

      case 'modern_left':
        return (
          <div className={`w-full h-full flex flex-col ${paddingTopClass} ${horizontalPadding} relative z-10 justify-center`}>
            <div className={`text-left ${titleToPhoneGap} w-full relative pl-6 shrink-0`}>
               {/* Accent Bar */}
               <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-full" style={{ backgroundColor: tenant.primaryColor }}></div>
              <h2 className={titleClass}>
                {title}
              </h2>
              <p className={subtitleClass}>
                {subtitle}
              </p>
            </div>
            <div className="flex justify-center items-end relative w-full shrink-0">
              <div className={`transform origin-bottom shadow-2xl rounded-[2.5rem] ${phoneScaleClass} translate-x-4`}>
                 <PhoneFrame customImage={customImage} platform={platform}>{children}</PhoneFrame>
              </div>
            </div>
          </div>
        );

      case 'modern_right':
        return (
          <div className={`w-full h-full flex flex-col ${paddingTopClass} ${horizontalPadding} relative z-10 justify-center`}>
            <div className={`text-right ${titleToPhoneGap} w-full flex flex-col items-end pr-6 relative shrink-0`}>
               <div className="absolute right-0 top-2 bottom-2 w-1.5 rounded-full" style={{ backgroundColor: tenant.primaryColor }}></div>
              <h2 className={titleClass}>
                {title}
              </h2>
              <p className={subtitleClass}>
                {subtitle}
              </p>
            </div>
            <div className="flex justify-center items-end relative w-full shrink-0">
              <div className={`transform origin-bottom shadow-2xl rounded-[2.5rem] ${phoneScaleClass} -translate-x-4`}>
                 <PhoneFrame customImage={customImage} platform={platform}>{children}</PhoneFrame>
              </div>
            </div>
          </div>
        );

      case 'big_phone':
        return (
          <div className={`w-full h-full flex flex-col ${paddingTopClass} ${horizontalPadding} relative z-10 overflow-hidden justify-center`}>
            <div className="text-center mb-2 w-full px-2 relative z-20 flex flex-col items-center shrink-0">
              <span 
                className="inline-block px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-3"
                style={{ backgroundColor: tenant.primaryColor }}
              >
                Nouveau
              </span>
              <h2 className="text-gray-900 text-2xl font-extrabold leading-tight break-words max-w-[300px]">
                {title}
              </h2>
            </div>
            <div className="flex justify-center items-end relative w-full shrink-0">
              <div className={`transform shadow-2xl rounded-[2.5rem] ${bigPhoneScaleClass} ${bigPhoneTranslateClass}`}>
                 <PhoneFrame customImage={customImage} platform={platform}>{children}</PhoneFrame>
              </div>
            </div>
          </div>
        );
      
      case 'minimal':
         return (
          <div className={`w-full h-full flex flex-col justify-center items-center ${paddingTopClass} ${horizontalPadding} relative z-10`}>
             <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: tenant.primaryColor }}></div>
             
             {/* Phone in middle */}
             <div className="flex items-center justify-center w-full my-8 shrink-0">
                <div className={`transform shadow-xl rounded-[2.5rem] scale-[0.85]`}>
                  <PhoneFrame customImage={customImage} platform={platform}>{children}</PhoneFrame>
                </div>
             </div>

             {/* Text at bottom */}
             <div className="pb-10 text-center w-full shrink-0">
                <h2 className="text-gray-900 text-2xl font-extrabold mb-0 break-words">
                  {title}
                </h2>
                <p className="text-gray-500 text-base font-medium break-words max-w-[300px] mx-auto">
                  {subtitle}
                </p>
             </div>
          </div>
         );

      case 'classic':
      default:
        return (
          <div className={`w-full h-full flex flex-col ${paddingTopClass} ${horizontalPadding} relative z-10 justify-center`}>
            <div className={`text-center ${titleToPhoneGap} w-full flex flex-col items-center shrink-0`}>
              <h2 className={titleClass}>
                {title}
              </h2>
              <div className="w-12 h-1 rounded-full bg-gray-200 mb-4"></div>
              <p className={subtitleClass}>
                {subtitle}
              </p>
            </div>
            <div className="flex justify-center items-end relative w-full shrink-0">
              {/* Phone anchored to bottom relative to the content block, but centered in container */}
              <div className={`transform origin-bottom shadow-2xl rounded-[2.5rem] ${phoneScaleClass} ${phoneTranslateClass}`}>
                 <PhoneFrame customImage={customImage} platform={platform}>{children}</PhoneFrame>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      ref={ref}
      id={id}
      className="flex flex-col bg-[#F9F9F9] relative overflow-hidden shrink-0 shadow-sm transition-all origin-top font-sans"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `scale(${scale})`,
        // FORCE TEXT RENDERING FIXES FOR EXPORT
        fontVariantLigatures: 'none',
        textRendering: 'geometricPrecision',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {renderLayoutContent()}
    </div>
  );
});

ScreenshotWrapper.displayName = 'ScreenshotWrapper';