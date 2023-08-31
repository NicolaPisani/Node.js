const figlet = require("figlet");

const text = `
  Ciao,
  mi chiamo Nicola : )
`;

const options = {
  font: "Big",
};

figlet.text(text, options, (err, data) => {
  if (err) {
    console.error("Something went wrong...");
    console.dir(err);
    return;
  }

  const coloredData = `\x1b[34m${data}\x1b[0m`; 

  console.log(coloredData);
});
