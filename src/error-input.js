import inquirer from 'inquirer';

const questions = {
  appName: {
    type: 'input',
    name: 'data',
    message: '请输入你要分析的应用名',
    default: 'collection',
  },
  filePath: {
    type: 'input',
    name: 'data',
    message: '请输入你要分析的 sourceMap 文件名',
    default: 'modal.esm.js.map.json',
  },
  line: {
    type: 'input',
    name: 'data',
    message: '请输入错误信息所在的行',
    default: '157',
  },
  column: {
    type: 'input',
    name: 'data',
    message: '请输入错误信息所在的列',
    default: '557369',
  },
};

export const inputErrorInfo = async () => {
  try {
    const result = {};

    for (const [questionName, questionDate] of Object.entries(questions)) {
      const answer = await inquirer.prompt([questionDate]);

      result[questionName] = answer.data;
    }

    return result;
  } catch (e) {
    console.error('输入信息有误，请重新输入: ', e);

    return null;
  }
};
