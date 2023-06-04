const express = require("express");
const Agora = require("agora-access-token");

const app = express();
app.use(express.json());
app.post("*", (req, res) => {
  res.send({ message: 'hi Mina' });
})
app.post("/gettoken", (req, res) => {
  const appID = "c3e8e71cae794f4eb01046f29e2e84e9";
  const appCertificate = "101f2ad714e742ebbf1303cf7bb032f1";
  const expirationTimeInSeconds = 3600;
  const uid = Math.floor(Math.random() * 100000);
  const role = Agora.RtcRole.PUBLISHER;
  const channel = req.body.channel;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
  const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
  console.log({ uid, token });
  res.send({ uid, token });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));
