import chalk from "chalk";

const testFunction = async () => {
  const text = chalk.blue("Hello World");

  console.log(text);
};

testFunction();
