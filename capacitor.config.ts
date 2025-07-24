import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0f51aa110c22450da5b8dd6d43fe22e2',
  appName: 'sro-tech',
  webDir: 'dist',
  server: {
    url: 'https://0f51aa11-0c22-450d-a5b8-dd6d43fe22e2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    }
  }
};

export default config;