import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { CookiePreferencesDialog } from './CookiePreferencesDialog';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  isVisible: boolean;
  isPreferencesOpen: boolean;
  preferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  updatePreference: (type: string, value: boolean) => void;
  savePreferences: () => void;
  dismiss: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Essential cookies are always enabled
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consentCookie = Cookies.get(COOKIE_CONSENT_KEY);
    const preferencesCookie = Cookies.get(COOKIE_PREFERENCES_KEY);

    if (!consentCookie) {
      setIsVisible(true);
    } else if (preferencesCookie) {
      setPreferences(JSON.parse(preferencesCookie));
    }
  }, []);

  const saveConsent = (newPreferences: CookiePreferences) => {
    // Save preferences for 6 months
    Cookies.set(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences), { expires: 180 });
    Cookies.set(COOKIE_CONSENT_KEY, 'true', { expires: 180 });
    
    // Apply preferences
    setPreferences(newPreferences);
    setIsVisible(false);
    setIsPreferencesOpen(false);

    // Here you would typically initialize/disable tracking based on preferences
    if (newPreferences.analytics) {
      // Initialize analytics
  
    }
    if (newPreferences.marketing) {
      // Initialize marketing cookies
  
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    saveConsent(allAccepted);
  };

  const rejectAll = () => {
    const allRejected = {
      essential: true, // Essential cookies are always enabled
      analytics: false,
      marketing: false
    };
    saveConsent(allRejected);
  };

  const updatePreference = (type: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  const dismiss = () => {
    setIsVisible(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        isVisible,
        isPreferencesOpen,
        preferences,
        acceptAll,
        rejectAll,
        openPreferences,
        closePreferences,
        updatePreference,
        savePreferences,
        dismiss
      }}
    >
      {children}
      <CookiePreferencesDialog />
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}