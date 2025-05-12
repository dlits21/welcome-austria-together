
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1bb2e258a0914c6a91b6e4b8d2072f10',
  appName: 'welcome-austria-together',
  webDir: 'dist',
  server: {
    url: 'https://1bb2e258-a091-4c6a-91b6-e4b8d2072f10.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // Enable live reload for development
  android: {
    allowMixedContent: true
  },
  ios: {
    limitsNavigationsToAppBoundDomains: false
  }
};

export default config;
