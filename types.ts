import React from 'react';

export interface Transaction {
  id: string;
  name: string;
  type: 'Recharge' | 'Retrait' | 'Paiement';
  amount: number;
  date: string;
  avatar?: string;
}

export type TenantId = 
  | 'school' 
  | 'transport' 
  | 'university' 
  | 'health'
  | 'zamtel'
  | 'aftel'
  | 'sct_mtn_bernin'
  | 'verypay_transit'
  | 'cashless_school_ic'
  | 'cashless_school_senegal'
  | 'sakkonet_retail_uganda'
  | 'spiro'
  | 'verypay_cashless_schools';

export type AppType = 'customer' | 'merchant';

export interface Tenant {
  id: TenantId;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export type LayoutId = 'classic' | 'modern_left' | 'modern_right' | 'split_brand' | 'big_phone' | 'minimal';

// Serializable definition for the initial templates
export interface TemplateDef {
  id: number;
  label: string;
  defaultTitle: string;
  defaultSubtitle: string;
  // We will map this ID to a component in App.tsx to avoid storing ReactNodes in state
}

// Mutable state for a single screenshot
export interface ScreenshotConfig {
  uniqueId: string; // UUID
  templateId?: number; // Refers to the hardcoded template ID (1-8) if applicable
  label: string;
  title: string;
  subtitle: string;
  layout: LayoutId;
  customImage: string | null;
}

export interface ExportConfig {
  platform: 'ios' | 'android';
  device: '6.5' | '5.5' | 'android_default';
  format: 'png' | 'jpeg';
}

export const TENANTS: Record<TenantId, Tenant> = {
  school: {
    id: 'school',
    name: 'VeryPayMock1',
    primaryColor: '#F38B1C', // Orange
    secondaryColor: '#FFF7ED',
    accentColor: '#C2410C',
  },
  transport: {
    id: 'transport',
    name: 'VeryPayMock2',
    primaryColor: '#2563EB', // Blue
    secondaryColor: '#EFF6FF',
    accentColor: '#1E40AF',
  },
  university: {
    id: 'university',
    name: 'VeryPayMock3',
    primaryColor: '#7C3AED', // Purple
    secondaryColor: '#F5F3FF',
    accentColor: '#5B21B6',
  },
  health: {
    id: 'health',
    name: 'VeryPayMock4',
    primaryColor: '#059669', // Emerald
    secondaryColor: '#ECFDF5',
    accentColor: '#047857',
  },
  zamtel: {
    id: 'zamtel',
    name: 'Zamtel',
    primaryColor: '#39B54A',
    secondaryColor: '#F0FDF4',
    accentColor: '#166534',
  },
  aftel: {
    id: 'aftel',
    name: 'Aftel',
    primaryColor: '#E60000',
    secondaryColor: '#FEF2F2',
    accentColor: '#991B1B',
  },
  sct_mtn_bernin: {
    id: 'sct_mtn_bernin',
    name: 'SCT MTN Bernin',
    primaryColor: '#FFCB05',
    secondaryColor: '#FEFCE8',
    accentColor: '#CA8A04',
  },
  verypay_transit: {
    id: 'verypay_transit',
    name: 'VeryPay Transit',
    primaryColor: '#BF0B2C',
    secondaryColor: '#FFF1F2',
    accentColor: '#881337',
  },
  cashless_school_ic: {
    id: 'cashless_school_ic',
    name: 'Cashless School Ivory Coast',
    primaryColor: '#F6971D',
    secondaryColor: '#FFF7ED',
    accentColor: '#C2410C',
  },
  cashless_school_senegal: {
    id: 'cashless_school_senegal',
    name: 'Cashless School Senegal',
    primaryColor: '#BF0B2C',
    secondaryColor: '#FFF1F2',
    accentColor: '#881337',
  },
  sakkonet_retail_uganda: {
    id: 'sakkonet_retail_uganda',
    name: 'Sakkonet Retail Uganda',
    primaryColor: '#C5C5C5',
    secondaryColor: '#F9FAFB',
    accentColor: '#4B5563',
  },
  spiro: {
    id: 'spiro',
    name: 'Spiro',
    primaryColor: '#A2D45E',
    secondaryColor: '#ECFCCB',
    accentColor: '#4D7C0F',
  },
  verypay_cashless_schools: {
    id: 'verypay_cashless_schools',
    name: 'VeryPay Cashless Schools',
    primaryColor: '#7CB442',
    secondaryColor: '#F0FDF4',
    accentColor: '#166534',
  }
};