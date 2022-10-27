import sourceMap from 'source-map';
import fs from 'fs';
import path from 'path';

const ASSET_PATH_CONFIG = {
  collection: 'dist/client-build/',
};

let _appName = '';

const getFullPath = (filePath) => {
  const prefix = ASSET_PATH_CONFIG[_appName];

  if (!prefix) {
    throw new Error(`没有此应用 (${_appName}) 的构建目录配置`);
  }

  return path.join(path.dirname('./'), prefix, filePath);
};

const getFileContent = (filePath) => {
  const fullFilePath = getFullPath(filePath);

  return JSON.parse(fs.readFileSync(fullFilePath).toString());
};

export const findSource = async ({appName, rawSourceMapFilePath, line, column}) => {
  try {
    _appName = appName;

    const fileContent = getFileContent(rawSourceMapFilePath);

    const consumer = await new sourceMap.SourceMapConsumer(fileContent);

    return consumer.originalPositionFor({
      line,
      column,
    });
  } catch (e) {
    console.error('解析 sourceMap 文件出错：', e);

    return null;
  } finally {
    _appName = '';
  }
};
