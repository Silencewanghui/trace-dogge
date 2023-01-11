import inquirer from 'inquirer';

const questions = {
  appName: [
    {
      type: 'input',
      name: 'appName',
      message: '请输入你要分析的应用名',
      default: 'collection',
    },
  ],
  version: [
    {
      type: 'input',
      name: 'version',
      message: '请输入你要分析的版本号(ex: collection-v3.77.6)',
      default: '',
    },
  ],
  filePath: [
    {
      type: 'input',
      name: 'filePath',
      message: '请输入你要分析的 sourceMap 文件名',
      default: 'bundle.js.map',
    },
  ],
  position: [
    {
      type: 'input',
      name: 'position',
      message: '请输入错误信息所在的位置(行:列)',
      default: '',
    },
  ],
};

export const inputAppName = async () => {
  const {appName} = await inquirer.prompt(questions.appName);

  if (!appName) {
    throw new Error('请输入应用名！');
  }

  return appName;
};

export const inputVersion = async () => {
  const {version} = await inquirer.prompt(questions.version);

  if (!version) {
    throw new Error('请输入版本号信息！');
  }

  return version;
};

export const inputFilepath = async () => {
  const {filePath} = await inquirer.prompt(questions.filePath);

  if (!filePath) {
    throw new Error('请输入 sourceMap 文件名！');
  }

  return filePath;
};

export const inputSourcePosition = async () => {
  const {position} = await inquirer.prompt(questions.position);

  if (!position) {
    throw new Error('请输入错误信息的位置信息！');
  }

  const [line, column] = position.split(':');

  if (!line || !column) {
    throw new Error('请输入规范的位置信息(行:列)');
  }

  return {line, column};
};
