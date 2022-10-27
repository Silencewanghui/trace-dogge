// Get the target git tag and build the target app.
import inquirer from 'inquirer';
import util from 'util';
import {exec as nodeExec} from 'child_process';

import {getConfig} from './config.js';

const exec = util.promisify(nodeExec);

const questions = [
  {
    type: 'input',
    name: 'appName',
    message: '请输入你要分析的应用名',
    default: 'collection',
  },
  {
    type: 'input',
    name: 'version',
    message: '请输入你要分析的版本号(ex: collection-v3.77.6)',
    default: '',
  },
];

// Create a git branch base on the given version value as a git tag
const createBranch = async (version) => {
  const branchName = `trace-dogge-temp-${version}`;
  const command = `git checkout -b ${branchName} ${version}`;

  console.log(`\n>>>>>>> 开始新建分支\n`);
  console.log(`\n${command}\n`);

  const {error} = await exec(command);

  if (error) {
    throw new Error('创建分支失败：', error);
  }

  console.log('\n>>>>>>> 新建分支成功\n');
};

// Build the target app to get the source map files
const buildApp = async (buildScript) => {
  // Install dependencies and start build
  const command = `./pnpm install && ${buildScript}`;

  console.log('\n>>>>>>> 开始构建\n');
  console.log(`\n${command}\n`);

  const {error, stdout} = await exec(command);

  if (error) {
    throw new Error('构建 app 失败：', error);
  }

  console.log(stdout);
  console.log('\n>>>>>>> 构建完成\n');
};

export const execPreWork = async () => {
  try {
    const {appName, version} = await inquirer.prompt(questions);

    if (!appName || !version) {
      throw new Error('请输入应用信息！');
    }

    const {buildScript} = getConfig(appName);

    await createBranch(version);
    await buildApp(buildScript);
  } catch (e) {
    console.error('执行失败: ', e);

    return null;
  }
};
