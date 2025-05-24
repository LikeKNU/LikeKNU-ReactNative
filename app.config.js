const IS_BETA = process.env.APP_VARIANT !== 'production';

export default ({ config }) => {
  return {
    ...config,
    name: IS_BETA ? '공주대처럼β' : '공주대처럼',
    android: {
      ...config.android,
      googleServicesFile: IS_BETA ? process.env.GOOGLE_SERVICES_JSON_BETA
        : process.env.GOOGLE_SERVICES_JSON,
      package: IS_BETA ? 'ac.knu.likeknu.beta' : 'ac.knu.likeknu'
    },
    ios: {
      ...config.ios,
      googleServicesFile: IS_BETA ? process.env.GOOGLE_SERVICE_INFO_PLIST_BETA
        : process.env.GOOGLE_SERVICE_INFO_PLIST,
      bundleIdentifier: IS_BETA ? 'com.woopaca.likeknu.beta' : 'com.woopaca.likeknu'
    },
    extra: {
      ...config.extra,
      apiUrl: process.env.SERVER_URL
    }
  };
};
