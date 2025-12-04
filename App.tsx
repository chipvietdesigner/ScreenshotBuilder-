
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Download, Upload, Monitor, Smartphone, Layout, ChevronRight, 
  Image as ImageIcon, Camera, Building2, Bus, GraduationCap, HeartPulse,
  AlignCenter, AlignLeft, AlignRight, Maximize, Trash2, Plus, 
  Type, Settings2, AppWindow, Save, Cloud, CloudUpload, Loader2
} from 'lucide-react';
import { ScreenshotWrapper } from './components/ScreenshotWrapper';
import { Screen1_PaymentToken as S1 } from './components/screens/Screen1_PaymentToken';
import { Screen2_Account as S2 } from './components/screens/Screen2_Account';
import { Screen3_Family as S3 } from './components/screens/Screen3_Family';
import { Screen4_IntroGuardian as S4 } from './components/screens/Screen4_IntroGuardian';
import { Screen5_CodeInput as S5 } from './components/screens/Screen5_CodeInput';
import { Screen6_InviteDetails as S6 } from './components/screens/Screen6_InviteDetails';
import { Screen7_Transactions as S7 } from './components/screens/Screen7_Transactions';
import { Screen8_Spending as S8 } from './components/screens/Screen8_Spending';

import { TENANTS, TenantId, Tenant, LayoutId, ScreenshotConfig, TemplateDef, AppType, ExportConfig } from './types';
import { loadAppState, saveAppState } from './storage/stateStorage';
import { saveContextToCloud, loadContextFromCloud } from './storage/firebase';

// --- INITIAL TEMPLATES DEFINITION ---
const BASE_TEMPLATES: TemplateDef[] = [
  { id: 1, label: "Payment Token", defaultTitle: "Get your payment tokens now!", defaultSubtitle: "Activate your card easily." },
  { id: 2, label: "Account Mgmt", defaultTitle: "Manage your account transparently!", defaultSubtitle: "Clear balance and transactions." },
  { id: 3, label: "Family Accounts", defaultTitle: "Create and manage your accounts!", defaultSubtitle: "Track school wallets." },
  { id: 4, label: "Invite - Intro", defaultTitle: "Invite a secondary guardian!", defaultSubtitle: "Share access securely." },
  { id: 5, label: "Invite - Code", defaultTitle: "Enter the invitation code.", defaultSubtitle: "Join a family quickly." },
  { id: 6, label: "Invite - Details", defaultTitle: "Verify the information.", defaultSubtitle: "View guardian profile." },
  { id: 7, label: "Expense Tracking", defaultTitle: "Track expenses with one click.", defaultSubtitle: "All transactions in one place." },
  { id: 8, label: "Overview", defaultTitle: "Keep an eye on the family.", defaultSubtitle: "Real-time activities." }
];

// Helper to render component by ID
const getComponentById = (id?: number) => {
  switch(id) {
    case 1: return <S1 />;
    case 2: return <S2 />;
    case 3: return <S3 />;
    case 4: return <S4 />;
    case 5: return <S5 />;
    case 6: return <S6 />;
    case 7: return <S7 />;
    case 8: return <S8 />;
    default: return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
        <Smartphone size={48} className="mb-4 opacity-50" />
        <p className="font-bold">Placeholder UI</p>
        <p className="text-xs">Import an image or select a template content.</p>
      </div>
    );
  }
};

const LAYOUT_OPTIONS: { id: LayoutId; label: string; icon: any }[] = [
  { id: 'classic', label: 'Classic', icon: AlignCenter },
  { id: 'modern_left', label: 'Left', icon: AlignLeft },
  { id: 'modern_right', label: 'Right', icon: AlignRight },
  { id: 'split_brand', label: 'Split Brand', icon: Layout },
  { id: 'big_phone', label: 'Zoom', icon: Maximize },
  { id: 'minimal', label: 'Minimal', icon: AlignCenter },
];

export default function App() {
  // --- INITIALIZATION ---
  // Load state from local storage synchronously on first render to prevent flicker/overwrite
  const [savedState] = useState(() => loadAppState());

  // --- GLOBAL CONTEXT STATE ---
  const [currentAppType, setCurrentAppType] = useState<AppType>(savedState?.currentAppType ?? 'customer');
  const [currentTenantId, setCurrentTenantId] = useState<TenantId>(savedState?.currentTenantId ?? 'school');
  
  // --- DATA STORE ---
  // Key = `${appType}:${tenantId}` -> Value = ScreenshotConfig[]
  const [dataStore, setDataStore] = useState<Record<string, ScreenshotConfig[]>>(savedState?.dataStore ?? {});
  
  // --- UI STATE ---
  const [activeScreenIndex, setActiveScreenIndex] = useState(savedState?.activeScreenIndex ?? 0); 
  const [isExporting, setIsExporting] = useState(false);
  const [isSavingLocal, setIsSavingLocal] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [isLoadingCloud, setIsLoadingCloud] = useState(false);
  const [cloudMessage, setCloudMessage] = useState<string | null>(null);
  
  // Export Configuration
  const [exportConfig, setExportConfig] = useState<ExportConfig>(savedState?.exportConfig ?? {
    platform: 'ios',
    device: '6.5',
    format: 'png'
  });

  const currentContextKey = `${currentAppType}:${currentTenantId}`;
  const currentTenant = TENANTS[currentTenantId];

  // --- CLOUD SYNC LOGIC ---
  useEffect(() => {
    let isMounted = true;

    const syncData = async () => {
      setIsLoadingCloud(true);
      try {
        const cloudData = await loadContextFromCloud(currentContextKey);
        
        if (isMounted) {
          if (cloudData && cloudData.screens && cloudData.screens.length > 0) {
            // Found data in cloud -> Overwrite local context data
            setDataStore(prev => ({
              ...prev,
              [currentContextKey]: cloudData.screens
            }));
            
            // Restore other persisted properties
            if (cloudData.exportConfig) {
              setExportConfig(cloudData.exportConfig);
            }
            
            // Restore active index or reset if out of bounds
            if (typeof cloudData.activeScreenIndex === 'number' && cloudData.activeScreenIndex < cloudData.screens.length) {
              setActiveScreenIndex(cloudData.activeScreenIndex);
            } else {
              setActiveScreenIndex(0);
            }

          } else {
            // No cloud data -> Check if we have local data, if not, init defaults
            setDataStore(prev => {
              if (prev[currentContextKey] && prev[currentContextKey].length > 0) {
                return prev; // Keep existing local data
              }
              // Init defaults
              const initialScreens: ScreenshotConfig[] = BASE_TEMPLATES.map(t => ({
                uniqueId: crypto.randomUUID(),
                label: t.label,
                title: t.defaultTitle,
                subtitle: t.defaultSubtitle,
                layout: 'classic',
                customImage: null
              }));
              return {
                ...prev,
                [currentContextKey]: initialScreens
              };
            });
          }
        }
      } catch (err) {
        console.error("Failed to sync with cloud", err);
        // Fallback to defaults if sync fails
        setDataStore(prev => {
           if (!prev[currentContextKey]) {
              const initialScreens: ScreenshotConfig[] = BASE_TEMPLATES.map(t => ({
                uniqueId: crypto.randomUUID(),
                label: t.label,
                title: t.defaultTitle,
                subtitle: t.defaultSubtitle,
                layout: 'classic',
                customImage: null
              }));
              return { ...prev, [currentContextKey]: initialScreens };
           }
           return prev;
        });
      } finally {
        if (isMounted) setIsLoadingCloud(false);
      }
    };

    syncData();

    return () => { isMounted = false; };
  }, [currentContextKey]);


  // Derived: Current List of Screens
  const currentScreens = dataStore[currentContextKey] || [];
  const activeScreen = currentScreens[activeScreenIndex];

  // --- ACTIONS ---

  const handleSaveLocal = () => {
    saveAppState({
      currentAppType,
      currentTenantId,
      dataStore,
      activeScreenIndex,
      exportConfig
    });
    
    setIsSavingLocal(true);
    setTimeout(() => setIsSavingLocal(false), 2000);
  };

  const handleSaveToCloud = async () => {
    if (!currentScreens.length) return;
    
    setIsSavingCloud(true);
    setCloudMessage(null);
    try {
      await saveContextToCloud(currentContextKey, {
        appType: currentAppType,
        tenantId: currentTenantId,
        screens: currentScreens,
        exportConfig: exportConfig,
        activeScreenIndex: activeScreenIndex
      });
      setCloudMessage("Saved to cloud!");
      setTimeout(() => setCloudMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setCloudMessage("Failed to save.");
    } finally {
      setIsSavingCloud(false);
    }
  };

  const handleUpdateActiveScreen = (updates: Partial<ScreenshotConfig>) => {
    if (!activeScreen) return;
    
    setDataStore(prev => {
      const newList = [...(prev[currentContextKey] || [])];
      newList[activeScreenIndex] = { ...newList[activeScreenIndex], ...updates };
      return { ...prev, [currentContextKey]: newList };
    });
  };

  const handleAddScreenshot = () => {
    const newName = prompt("New screenshot name:", "New screen");
    if (!newName) return;

    const newScreen: ScreenshotConfig = {
      uniqueId: crypto.randomUUID(),
      templateId: undefined, // No internal template
      label: newName,
      title: "New Title",
      subtitle: "New Subtitle",
      layout: 'classic',
      customImage: null
    };

    setDataStore(prev => ({
      ...prev,
      [currentContextKey]: [...(prev[currentContextKey] || []), newScreen]
    }));
    
    // Switch to new screen
    setActiveScreenIndex(currentScreens.length);
  };

  const handleDeleteScreenshot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Do you really want to delete this screen?")) return;

    setDataStore(prev => {
      const newList = [...(prev[currentContextKey] || [])];
      newList.splice(index, 1);
      return { ...prev, [currentContextKey]: newList };
    });

    // Adjust index if needed
    if (activeScreenIndex >= index && activeScreenIndex > 0) {
      setActiveScreenIndex(activeScreenIndex - 1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateActiveScreen({ customImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const exportRef = useRef<HTMLDivElement>(null);

  // Determine Dimensions for Logical Rendering
  const exportDimensions = (() => {
      if (exportConfig.platform === 'ios' && exportConfig.device === '5.5') {
          return { w: 414, h: 736 }; // Logical size for 16:9 5.5" iPhone
      }
      return { w: 414, h: 896 }; // Logical size for 19.5:9 6.5" iPhone
  })();

  const handleExport = async () => {
    if (!exportRef.current || !activeScreen) return;
    setIsExporting(true);
    
    // Determine Scale Factor based on desired output width (1242px)
    // 1242 / 414 = 3
    const scaleFactor = 3;

    // Wait for the offscreen render to be ready
    await new Promise(r => setTimeout(r, 200));

    try {
        const html2canvas = (window as any).html2canvas;
        if (typeof html2canvas === 'undefined') {
            alert("Library loading...");
            return;
        }

        const canvas = await html2canvas(exportRef.current, {
            scale: scaleFactor, 
            useCORS: true,
            backgroundColor: '#F9F9F9',
            logging: false,
            width: exportDimensions.w,
            height: exportDimensions.h,
            letterRendering: true, // Attempt to improve text rendering
            imageTimeout: 0,
        });

        const link = document.createElement('a');
        const filename = `${currentAppType}_${currentTenantId}_${activeScreen.label.replace(/\s+/g, '_')}_${exportConfig.device || 'android'}.${exportConfig.format}`;
        link.download = filename;
        link.href = canvas.toDataURL(`image/${exportConfig.format}`, 0.9);
        link.click();

    } catch (err) {
        console.error(err);
        alert("Export failed.");
    } finally {
        setIsExporting(false);
    }
  };

  // Render
  if (isLoadingCloud && !currentScreens.length) {
     return (
       <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500 gap-4">
         <Loader2 className="animate-spin text-gray-400" size={48} />
         <p className="text-sm font-bold">Syncing with cloud...</p>
       </div>
     );
  }

  // Fallback for empty state while loading first time
  if (!activeScreen && !isLoadingCloud) return <div className="h-screen flex items-center justify-center">Initializing...</div>;

  return (
    <>
      {/* 
        ----------------------------------------------------
        OFF-SCREEN EXPORT CONTAINER
        This is a hidden, pixel-perfect render for html2canvas
        ---------------------------------------------------- 
      */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: '-10000px', 
          width: exportDimensions.w,
          height: exportDimensions.h,
          zIndex: -50,
          visibility: 'visible' // must be visible for canvas to capture
        }}
      >
        <div ref={exportRef}>
           {activeScreen && (
            <ScreenshotWrapper
                title={activeScreen.title}
                subtitle={activeScreen.subtitle}
                tenant={currentTenant}
                layout={activeScreen.layout}
                customImage={activeScreen.customImage}
                width={exportDimensions.w}
                height={exportDimensions.h}
                scale={1} // Exact logical scale
                appType={currentAppType}
                platform={exportConfig.platform}
            >
                {getComponentById(activeScreen.templateId)}
            </ScreenshotWrapper>
           )}
        </div>
      </div>


      {/* 
        ----------------------------------------------------
        MAIN APP UI
        ---------------------------------------------------- 
      */}
      <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
        
        {/* --- TOP BAR --- */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-50 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: currentTenant.primaryColor }}>
                 <Smartphone size={18} />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight hidden md:block">
                Screenshot<span style={{ color: currentTenant.primaryColor }}>Builder</span>
              </h1>
            </div>
            
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            
            {/* App Type Selector */}
             <div className="flex items-center gap-2">
               <AppWindow size={16} className="text-gray-400" />
               <div className="relative">
                  <select 
                      value={currentAppType} 
                      onChange={(e) => setCurrentAppType(e.target.value as AppType)}
                      className="appearance-none bg-gray-100 hover:bg-gray-200 border-none rounded-md py-1.5 pl-3 pr-8 text-sm font-bold text-gray-700 cursor-pointer focus:ring-2 focus:ring-offset-1 transition-colors"
                  >
                      <option value="customer">Customer App</option>
                      <option value="merchant">Merchant App</option>
                  </select>
                  <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none rotate-90" />
               </div>
            </div>

            {/* Tenant Selector */}
            <div className="flex items-center gap-2">
               <Building2 size={16} className="text-gray-400" />
               <div className="relative">
                  <select 
                      value={currentTenantId} 
                      onChange={(e) => setCurrentTenantId(e.target.value as TenantId)}
                      className="appearance-none bg-gray-100 hover:bg-gray-200 border-none rounded-md py-1.5 pl-3 pr-8 text-sm font-bold text-gray-700 cursor-pointer focus:ring-2 focus:ring-offset-1 transition-colors"
                      style={{  outlineColor: currentTenant.primaryColor }}
                  >
                      {Object.values(TENANTS).map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                  </select>
                  <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none rotate-90" />
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
              <button 
                onClick={handleSaveLocal}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  isSavingLocal
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Save size={16} />
                {isSavingLocal ? 'Saved Locally!' : 'Local Save'}
              </button>
              
              <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full border border-gray-200">
                  Light Mode
              </span>
          </div>
        </header>


        {/* --- MAIN CONTENT GRID --- */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* COL 1: SCREEN LIST */}
          <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 backdrop-blur-sm z-10 flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      Screens ({currentScreens.length})
                    </h3>
                    {isLoadingCloud && <span className="text-[10px] text-orange-500 font-medium">Syncing...</span>}
                  </div>
                  <button 
                    onClick={handleAddScreenshot}
                    className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700 transition-colors"
                    title="Add screenshot"
                  >
                    <Plus size={16} />
                  </button>
              </div>
              <div className="p-3 space-y-2">
                  {currentScreens.map((screen, index) => {
                      const isSelected = activeScreenIndex === index;
                      return (
                          <div 
                              key={screen.uniqueId}
                              onClick={() => setActiveScreenIndex(index)}
                              className={`group cursor-pointer rounded-xl p-3 border-2 transition-all duration-200 relative overflow-hidden ${
                                  isSelected 
                                  ? 'bg-white shadow-md border-l-4' 
                                  : 'bg-gray-50 border-transparent hover:border-gray-200'
                              }`}
                              style={{ 
                                borderColor: isSelected ? currentTenant.primaryColor : undefined,
                                borderLeftColor: isSelected ? currentTenant.primaryColor : undefined
                              }}
                          >
                             <div className="flex items-center justify-between mb-1">
                                 <div className="flex items-center gap-2 overflow-hidden">
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                          isSelected ? 'text-white' : 'bg-gray-200 text-gray-500'
                                      }`} style={{ backgroundColor: isSelected ? currentTenant.primaryColor : undefined }}>
                                          {index + 1}
                                      </div>
                                      <span className={`text-sm font-bold truncate ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>
                                          {screen.label}
                                      </span>
                                 </div>
                                 <button 
                                    onClick={(e) => handleDeleteScreenshot(index, e)}
                                    className={`p-1 rounded text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ${currentScreens.length <= 1 ? 'hidden' : ''}`}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                             </div>
                             <div className="text-[10px] text-gray-400 pl-7 truncate">
                               {screen.layout}
                             </div>
                          </div>
                      );
                  })}
              </div>
          </aside>


          {/* COL 2: MAIN CANVAS (PREVIEW) */}
          <main className="flex-1 bg-gray-100/50 relative flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ 
                      backgroundImage: `radial-gradient(${currentTenant.primaryColor} 1px, transparent 1px)`, 
                      backgroundSize: '20px 20px' 
                  }} 
              />
              
              {/* The Render Container - SCALED FOR PREVIEW ONLY */}
              {activeScreen && (
                <div className="relative z-10 shadow-2xl rounded-sm border-[4px] border-white bg-white transition-all duration-300 ease-in-out max-h-full max-w-full flex items-center justify-center overflow-hidden"
                    style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}
                >
                    {/* This one is NOT referenced by exportRef, so we can scale it freely */}
                    <div>
                        <ScreenshotWrapper
                            title={activeScreen.title}
                            subtitle={activeScreen.subtitle}
                            tenant={currentTenant}
                            layout={activeScreen.layout}
                            customImage={activeScreen.customImage}
                            width={exportDimensions.w}
                            height={exportDimensions.h}
                            scale={1}
                            appType={currentAppType}
                            platform={exportConfig.platform}
                        >
                            {getComponentById(activeScreen.templateId)}
                        </ScreenshotWrapper>
                    </div>
                </div>
              )}

              {activeScreen && (
                <div className="absolute bottom-6 flex gap-2">
                    <div className="px-4 py-2 bg-white rounded-full shadow-sm text-xs font-bold text-gray-400 flex items-center gap-2 border border-gray-200">
                        <Monitor size={14} /> {activeScreen.layout}
                    </div>
                    {activeScreen.customImage && (
                        <div className="px-4 py-2 bg-green-50 text-green-600 rounded-full shadow-sm text-xs font-bold flex items-center gap-2 border border-green-100">
                            <Camera size={14} /> Active image
                        </div>
                    )}
                    <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full shadow-sm text-xs font-bold flex items-center gap-2 border border-blue-100">
                        Export: {exportConfig.device}" ({exportDimensions.w * 3}x{exportDimensions.h * 3}px)
                    </div>
                </div>
              )}
          </main>


          {/* COL 3: TOOLS & EDITOR */}
          <aside className="w-[320px] bg-white border-l border-gray-200 flex flex-col z-20 shadow-xl">
              
              {/* Context Header */}
              <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      Edit
                  </h2>
                  <p className="text-xs text-gray-400 uppercase font-bold mt-1">
                      {currentAppType} • {currentTenant.name}
                  </p>
              </div>

              {activeScreen ? (
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  
                  {/* 1. Text Editor */}
                  <div>
                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Type size={14} /> Content
                      </label>
                      <div className="space-y-3">
                        <div>
                          <span className="text-xs font-bold text-gray-600 mb-1 block">Title</span>
                          <input 
                            type="text" 
                            value={activeScreen.title}
                            onChange={(e) => handleUpdateActiveScreen({ title: e.target.value })}
                            className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-600 mb-1 block">Subtitle</span>
                          <textarea 
                            value={activeScreen.subtitle}
                            onChange={(e) => handleUpdateActiveScreen({ subtitle: e.target.value })}
                            className="w-full text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none h-20"
                          />
                        </div>
                      </div>
                  </div>

                  {/* 2. Layout Selector */}
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Layout size={14} /> Layout
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                          {LAYOUT_OPTIONS.map(opt => (
                              <button
                                  key={opt.id}
                                  onClick={() => handleUpdateActiveScreen({ layout: opt.id })}
                                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                      activeScreen.layout === opt.id 
                                      ? 'bg-gray-50 border-gray-300 ring-1 ring-gray-300' 
                                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                  }`}
                              >
                                  <opt.icon className={`mb-2 ${activeScreen.layout === opt.id ? 'text-gray-900' : 'text-gray-400'}`} size={24} />
                                  <span className={`text-xs font-bold ${activeScreen.layout === opt.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                      {opt.label}
                                  </span>
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* 3. Image Import */}
                  <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <ImageIcon size={14} /> UI Image
                      </label>
                      <div className="space-y-3">
                           <label className="group relative flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                              <Upload className="text-gray-400 group-hover:text-gray-600 mb-2" size={20} />
                              <span className="text-xs font-bold text-gray-500">Import a screenshot</span>
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                           </label>
                           
                           {activeScreen.customImage && (
                              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                  <span className="text-xs font-bold text-green-700 flex items-center gap-2">
                                      <Camera size={14} /> Active image
                                  </span>
                                  <button 
                                      onClick={() => handleUpdateActiveScreen({ customImage: null })}
                                      className="p-1 hover:bg-green-100 rounded text-green-700"
                                  >
                                      ✕
                                  </button>
                              </div>
                           )}
                      </div>
                  </div>
              </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Select a screen</div>
              )}

              {/* 4. Export Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Download size={14} /> Export & Cloud
                  </label>
                  
                  {/* Export Settings */}
                  <div className="flex gap-2 mb-4">
                     <select 
                        value={exportConfig.platform}
                        onChange={(e) => setExportConfig({...exportConfig, platform: e.target.value as any})}
                        className="bg-white border border-gray-200 text-xs font-bold rounded-lg p-2 flex-1"
                     >
                       <option value="ios">iOS</option>
                       <option value="android">Android</option>
                     </select>
                     <select 
                        value={exportConfig.device}
                        onChange={(e) => setExportConfig({...exportConfig, device: e.target.value as any})}
                        className="bg-white border border-gray-200 text-xs font-bold rounded-lg p-2 flex-1"
                     >
                       {exportConfig.platform === 'ios' ? (
                         <>
                          <option value="6.5">6.5" (Standard)</option>
                          <option value="5.5">5.5" (16:9)</option>
                         </>
                       ) : (
                         <option value="android_default">Default</option>
                       )}
                     </select>
                     <select 
                        value={exportConfig.format}
                        onChange={(e) => setExportConfig({...exportConfig, format: e.target.value as any})}
                        className="bg-white border border-gray-200 text-xs font-bold rounded-lg p-2 w-20"
                     >
                       <option value="png">PNG</option>
                       <option value="jpeg">JPG</option>
                     </select>
                  </div>

                  <button 
                      onClick={handleExport}
                      disabled={isExporting}
                      className="w-full mb-3 py-3 px-4 rounded-xl font-bold text-white text-sm shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      style={{ backgroundColor: currentTenant.primaryColor }}
                  >
                      {isExporting ? 'Generating...' : 'Download Screenshot'}
                  </button>

                  <button 
                      onClick={handleSaveToCloud}
                      disabled={isSavingCloud}
                      className="w-full py-2 px-4 rounded-xl font-bold text-sm bg-gray-800 text-white shadow-sm hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                      title="Save current project to Cloud"
                  >
                      {isSavingCloud ? <Loader2 className="animate-spin" size={16} /> : <CloudUpload size={16} />}
                      {isSavingCloud ? 'Saving...' : 'Save to Cloud'}
                  </button>
                  {cloudMessage && (
                    <div className="mt-2 text-center text-xs font-bold text-green-600 animate-pulse">
                      {cloudMessage}
                    </div>
                  )}

                  <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                      {exportDimensions.w * 3} x {exportDimensions.h * 3} pixels
                  </p>
              </div>

          </aside>
        </div>
      </div>
    </>
  );
}
