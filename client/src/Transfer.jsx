import { useState } from "react";
import server from "./server";
import { getPublicKey } from "./address.js"
import { signTransaction } from "./sign.js"


function Transfer({ setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    try {
      let msg = "transfer"
      const signature = await signTransaction(msg, privateKey)
      let publicKey = getPublicKey(privateKey);
      const {
        data: { balance },
      } = await server.post(`send`, {
        msg: msg,
        signature: signature,
        publicKey: publicKey,
        amount: parseInt(sendAmount),
        recipient: recipient
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
