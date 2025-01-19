import chalk from 'chalk';
import gradient from 'gradient-string';

type Args = string | number | object | boolean;

const BLUE = '#0099F7';
const RED = '#F11712';
const YELLOW = '#FFFF00';
const GREEN = '#52C41A';

const ShawBoxGradient = gradient(BLUE, RED);
const ToucanBlue = chalk.hex(BLUE);
const ToucanRed = chalk.hex(RED);
const ToucanYellow = chalk.hex(YELLOW);
const ToucanGreen = chalk.hex(GREEN);

const success = (...args: Args[]) => {
  console.log(ToucanGreen.bold('成功：'), ...args);
};

const info = (...args: Args[]) => {
  console.log(ToucanBlue.bold('信息：'), ...args);
};

const error = (...args: Args[]) => {
  console.log(ToucanRed.bold('错误：'), ...args);
};

const warn = (...args: Args[]) => {
  console.log(ToucanYellow.bold('警告：'), ...args);
};

const dimmed = (...args: Args[]) => {
  console.log(chalk.dim(...args));
};

const item = (...args: Args[]) => {
  console.log(ToucanBlue.bold('  •'), ...args);
};

export const logger = {
  dimmed,
  error,
  info,
  item,
  success,
  ShawBoxGradient,
  warn,
};
