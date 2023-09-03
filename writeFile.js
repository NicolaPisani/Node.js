const fs = require("fs");

const dataToWrite = "Questo è il testo che scriveremo nel file.";

fs.writeFile("output.txt", dataToWrite, (err) => {
  if (err) {
    console.error(
      "Si è verificato un errore durante la scrittura del file:",
      err
    );
    return;
  }
  console.log("Il file è stato scritto con successo.");
});
