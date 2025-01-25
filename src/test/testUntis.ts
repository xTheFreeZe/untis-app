const testFunction = async () => {
  const input = 1234;

  // INsert a : after the first two digits
  const insertRegex = /(\d{2})/;
  const result = input.toString().replace(insertRegex, "$1:");

  console.log(result);
};

testFunction();
