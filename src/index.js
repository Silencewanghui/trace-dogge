import inquirer from 'inquirer';
import sourceMap from 'source-map';
import fs from 'fs';

const readJson = (fileDirection) => {
  return JSON.parse(fs.readFileSync(fileDirection).toString());
};

const findSource = async ({rawSourceMapFilePath, line, column}) => {
  const fileContent = readJson(rawSourceMapFilePath);

  const consumer = await new sourceMap.SourceMapConsumer(fileContent);

  return consumer.originalPositionFor({
    line: line,
    column: column,
  });
};

const main = async () => {
  const answerOne = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: '请输入你要分析的 sourceMap 文件名',
      default: './modal.esm.js.map.json',
    },
  ]);
  const answerTwo = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: '请输入错误信息所在的行',
      default: '157',
    },
  ]);
  const answerThree = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: '请输入错误信息所在的列',
      default: '557369',
    },
  ]);

  const positionInfo = await findSource({
    rawSourceMapFilePath: answerOne.question,
    line: Number(answerTwo.question),
    column: Number(answerThree.question),
  });

  console.log(positionInfo);
};

main();
