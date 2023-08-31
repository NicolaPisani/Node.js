import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("Request received");

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json"); // Cambio il tipo di contenuto in JSON

  const jsonResponse = JSON.stringify({ location: "Mars" , year:"3027"}); // Creo un oggetto JSON con "location" uguale a "Mars"
  response.end(jsonResponse);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
