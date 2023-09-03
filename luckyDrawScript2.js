function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResults() {
  try {
    const results = [];

    // Chiamo la funzione luckyDraw in modo asincrono per ciascun giocatore
    const players = ["Tina", "Jorge", "Julien"];
    for (const player of players) {
      const result = await luckyDraw(player);
      results.push(result);
    }

    // Stampo i risultati
    for (const result of results) {
      console.log(result);
    }
  } catch (error) {
    console.error(error.message);
  }
}

getResults()
