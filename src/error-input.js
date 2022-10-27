import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'appName',
    message: '请输入你要分析的应用名',
    default: 'collection',
  },
  {
    type: 'input',
    name: 'filePath',
    message: '请输入你要分析的 sourceMap 文件名',
    default: 'bundle.js.map',
  },
  {
    type: 'input',
    name: 'line',
    message: '请输入错误信息所在的行',
    default: '',
  },
  {
    type: 'input',
    name: 'column',
    message: '请输入错误信息所在的列',
    default: '',
  },
];

export const inputErrorInfo = async () => {
  try {
    const result = await inquirer.prompt(questions);

    Object.keys(result).forEach((key) => {
      if (!result[key]) {
        throw new Error('缺失错误信息！');
      }
    });

    return result;
  } catch (e) {
    console.error('输入信息有误，请重新输入: ', e);

    return null;
  }
};
