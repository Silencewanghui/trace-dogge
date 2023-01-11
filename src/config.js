const configData = {
  collection: {
    buildScript: './pnpm build',
    assetPath: 'dist/client-build/',
  },
  'workspaces-tools': {
    buildScript: './pnpm run client-bundle',
    assetPath: 'dist/',
  },
};

let _appName = '';

export const BRANCH_PREFIX = `trace-dogge-temp-${Date.now().toString().slice(-4)}`;

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
