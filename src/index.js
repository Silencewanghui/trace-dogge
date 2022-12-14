#! /usr/bin/env node
import {inputErrorInfo} from './error-input.js';
import {findSource} from './find-source.js';
import {execPreWork} from './pre-work.js';
import {checkIsInitialRun} from './checkIsInitialRun.js';

const main = async () => {
  const isInitialRun = await checkIsInitialRun();

  if (isInitialRun) {
    /**
     * Do some pre work, includes:
     * 1. create new branch base on the target version
     * 2. build target app to get the source map files
     */
    await execPreWork();
  }

  // Input the source map file path and corresponding error info(Lines and Columns)
  const {filePath, line, column} = await inputErrorInfo();

  // Find the related position in source codes base on source map file
  const positionOfSourceCodes = await findSource({
    rawSourceMapFilePath: filePath,
    line: Number(line),
    column: Number(column),
  });

  console.log('\n>>>>>>> 对应源代码位置信息如下：\n');
  console.log(positionOfSourceCodes);
};

main();
