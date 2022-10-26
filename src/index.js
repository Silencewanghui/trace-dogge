import inquirer from 'inquirer';

const main = async () => {
  const answerOne = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: '请输入你要分析的 sourceMap 文件名',
      default: 'bundle.js.map.json',
    },
  ]);
  const answerTwo = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: '请输入错误信息所在的行',
      default: '118',
    },
  ]);
  const answerThree = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: '请输入错误信息所在的列',
      default: '57',
    },
  ]);

  // TODO: use user's answer to figure out the actual file and code line

  console.log('你要查找的文件是：', answerOne.question);
  console.log('出错的行数是：', answerTwo.question);
  console.log('出错的列数是：', answerThree.question);
};

main();
