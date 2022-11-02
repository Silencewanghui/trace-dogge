// Check whether is initial run and check whether already has the build file
import util from 'util';
import fs from 'fs';
import {exec as nodeExec} from 'child_process';

import * as command from './command.js';
import {getConfig, setAppName, BRANCH_PREFIX} from './config.js';

const exec = util.promisify(nodeExec);

const checkIsTargetBranch = async () => {
  const {error, stdout} = await exec('git status');

  if (error) {
    throw new Error('查找 Git 分支信息失败: ', error);
  }

  if (stdout.split('\n').length) {
    // the prefix is 'On branch '
    const currentBranch = stdout.split('\n')[0].slice(10);

    return currentBranch.includes(BRANCH_PREFIX);
  }

  return false;
};

const checkBuildFiles = (appName) => {
  const {assetPath} = getConfig(appName);

  return fs.readdirSync(assetPath).length > 0;
};

export const checkIsInitialRun = async () => {
  try {
    const isInTargetBranch = await checkIsTargetBranch();

    if (!isInTargetBranch) {
      return true;
    }

    const appName = await command.inputAppName();
    setAppName(appName);

    const isHaveBuildFiles = checkBuildFiles(appName);

    return !isHaveBuildFiles;
  } catch (e) {
    console.error('检查状态失败: ', e);

    return null;
  }
};
