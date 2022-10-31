import sourceMap from 'source-map';
import fs from 'fs';
import path from 'path';

import {getConfig} from './config.js';

const getFullPath = (filePath) => {
  const {assetPath} = getConfig();

  if (!assetPath) {
    throw new Error(`没有此应用的构建目录配置`);
  }

  return path.join(path.dirname('./'), assetPath, filePath);
};

const getFileContent = (filePath) => {
  const fullFilePath = getFullPath(filePath);

  return JSON.parse(fs.readFileSync(fullFilePath).toString());
};

export const findSource = async ({rawSourceMapFilePath, line, column}) => {
  try {
    const fileContent = getFileContent(rawSourceMapFilePath);

    const consumer = await new sourceMap.SourceMapConsumer(fileContent);

    return consumer.originalPositionFor({
      line,
      column,
    });
  } catch (e) {
    console.error('解析 sourceMap 文件出错：', e);

    return null;
  }
};
