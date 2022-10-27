import {inputErrorInfo} from './error-input';
import {findSource} from './find-source';

const main = async () => {
  const {appName, filePath, line, column} = await inputErrorInfo();
  const positionOfSourceCodes = await findSource({
    appName,
    line: Number(line),
    column: Number(column),
    rawSourceMapFilePath: filePath,
  });

  console.log('\n>>>>>>> 对应源代码位置信息如下：\n');
  console.log(positionOfSourceCodes);
};

main();
