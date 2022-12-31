const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const pubAddress = require("./scripts/address.js")
const isSignValid = require("./scripts/validation.js");
const getPublicAddress = require("./scripts/address.js");

app.use(cors());
app.use(express.json());

const balances = {
  "6a301f0aac1a0668f23ab07b1b7eb57b01845147": 100,
  "8b12b168a62b9c96d451ab6ddd50961aefbb65f7": 50,
  "abde311007496039c7f6619d1df27ba11d5e7552": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { msg, signature, publicKey, recipient, amount } = req.body;
  const isVerified = isSignValid(msg, signature, publicKey);

  if (isVerified) {
    const sender = getPublicAddress(publicKey)
    console.log("sender: ", sender);
    setInitialBalance(sender);
    setInitialBalance(recipient);
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Not valid signature!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
