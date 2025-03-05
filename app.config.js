const IS_BETA = process.env.APP_VARIANT !== 'production';

export default ({ config }) => {
  return {
    ...config,
    name: IS_BETA ? '공주대처럼β' : '공주대처럼',
    android: {
      ...config.android,
      googleServicesFile: IS_BETA ? '/Users/jcw1031/Develop/LikeKNU/LikeKNU-ReactNative/secrets/android/google-services-beta.json'
        : '/Users/jcw1031/Develop/LikeKNU/LikeKNU-ReactNative/secrets/android/google-services.json',
      package: IS_BETA ? 'ac.knu.likeknu.beta' : 'ac.knu.likeknu'
    },
    ios: {
      ...config.ios,
      googleServicesFile: IS_BETA ? '/Users/jcw1031/Develop/LikeKNU/LikeKNU-ReactNative/secrets/ios/GoogleService-Info-beta.plist'
        : '/Users/jcw1031/Develop/LikeKNU/LikeKNU-ReactNative/secrets/ios/GoogleService-Info.plist',
      bundleIdentifier: IS_BETA ? 'com.woopaca.likeknu.beta' : 'com.woopaca.likeknu'
    },
    extra: {
      ...config.extra,
      apiUrl: process.env.SERVER_URL
    }
  };
};
