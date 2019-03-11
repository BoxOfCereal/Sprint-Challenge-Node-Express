// play this: https://www.youtube.com/watch?v=d-diB65scQU
const server = require("./server");
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
