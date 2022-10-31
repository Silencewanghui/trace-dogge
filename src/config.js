const configData = {
  collection: {
    buildScript: './pnpm build',
    assetPath: 'dist/client-build/',
  },
};

let _appName = '';

export const getConfig = (appName) => {
  const config = configData[appName || _appName];

  if (!config) {
    throw new Error(`没有此应用 (${_appName}) 的构建目录配置`);
  }

  _appName = appName;

  return config;
};
