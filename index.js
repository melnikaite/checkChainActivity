const Web3 = require('web3');

const web3 = new Web3(process.argv[2]);

(async () => {
  let count = 0;
  const initialNumber = await web3.eth.getBlockNumber();
  const initialTimestamp = Date.now() / 1000;
  let block = {
    number: initialNumber,
    timestamp: initialTimestamp,
  };
  while (block.timestamp > (process.argv[3] || (initialTimestamp - 5 * 60))) {// 5 min
    block = await web3.eth.getBlock(block.number - 1);
    count += block.transactions.length;
    console.log(`${block.transactions.length} transactions in block ${block.number}`);
  }
  const period = initialTimestamp - block.timestamp;
  console.log(`Total number of transactions ${count} in ${period} seconds`);
  console.log(`Transactions per second ${count / period}`);
  console.log(`Seconds to new block ${period / (initialNumber - block.number)}`);
})();
