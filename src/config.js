const configData = {
  collection: {
    buildScript: './pnpm build',
    assetPath: 'dist/client-build/',
  },
};

let _appName = '';

export const BRANCH_PREFIX = 'trace-dogge-temp';

export const getConfig = (appName) => {
  const config = configData[appName || _appName];

  if (!config) {
    throw new Error(`没有此应用 (${_appName}) 的构建目录配置`);
  }

  return config;
};

export const setAppName = (appName) => {
  _appName = appName;
};

export const getAppName = () => _appName;
