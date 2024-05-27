export default ({ config }) => {
  return {
    ...config,
    android: {
      ...config.android,
      // googleServicesFile: process.env.GOOGLE_SERVICES_JSON
      googleServicesFile: '/Users/jcw1031/Develop/LikeKNU/LikeKNU-ReactNative/secrets/android/google-services.json'
    },
    ios: {
      ...config.ios,
      // googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST
      googleServicesFile: '/Users/jcw1031/Develop/LikeKNU/LikeKNU-ReactNative/secrets/ios/GoogleService-Info.plist'
    }
  };
};
