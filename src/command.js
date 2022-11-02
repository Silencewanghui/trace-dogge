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
  line: [{type: 'input', name: 'line', message: '请输入错误信息所在的行', default: ''}],
  column: [{type: 'input', name: 'column', message: '请输入错误信息所在的列', default: ''}],
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

export const inputLine = async () => {
  const {line} = await inquirer.prompt(questions.line);

  if (!line) {
    throw new Error('请输入错误信息所在的行！');
  }

  return line;
};

export const inputColumn = async () => {
  const {column} = await inquirer.prompt(questions.column);

  if (!column) {
    throw new Error('请输入错误信息所在的列！');
  }

  return column;
};
