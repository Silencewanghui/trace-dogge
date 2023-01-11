import * as command from './command.js';

export const inputErrorInfo = async () => {
  try {
    const filePath = await command.inputFilepath();
    const {line, column} = await command.inputSourcePosition();
    const result = {filePath, line, column};

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
