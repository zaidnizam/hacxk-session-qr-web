
const express = require("express");
const app = express();





const pino = require("pino");
let { toBuffer } = require("qrcode");
const path = require('path');
const fs = require("fs-extra");
const { Boom } = require("@hapi/boom");
const PORT = process.env.PORT ||  5000
const MESSAGE = process.env.MESSAGE ||  `
╔════◇
║ *『 WAOW YOU CHOOSE HACXK-BOT-MD 』*
║ _________FREE PALESTINE_____________
╚════════════════════════╝
// ╔═════◇
// ║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
// ║ *Ytube:* _youtube.com/SuhailTechInfo_
// ║ *Owner:* _https://wa.me/923184474176_
// ║ *Note :*_Don't provide your SESSION_ID to_
// ║ _anyone otherwise that can access chats_
// ╚════════════════════════╝
`











if (fs.existsSync('./hacxk_session')) {
    fs.emptyDirSync(__dirname + '/hacxk_session');
  };
  
  app.use("/", async(req, res) => {

  const { default: HacxkWASocket, useMultiFileAuthState, Browsers, delay,DisconnectReason, makeInMemoryStore, } = require("@whiskeysockets/baileys");
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  async function HACXK() {
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/hacxk_session')
    try {
      let Hmd = HacxkWASocket({ 
        printQRInTerminal: false,
        logger: pino({ level: "silent" }), 
        browser: Browsers.baileys("Desktop"),
        auth: state 
        });


     Hmd.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect, qr } = s;
        if (qr) { res.end(await toBuffer(qr)); }


        if (connection == "open"){
          await delay(3000);
          let user = Hmd.user.id;


//===========================================================================================
//===============================  SESSION ID    ===========================================
//===========================================================================================

          let CREDS = fs.readFileSync(__dirname + '/hacxk_session/creds.json')
          var Scan_Id = Buffer.from(CREDS).toString('base64')
         // res.json({status:true,Scan_Id })
          console.log(`
====================  SESSION ID  ==========================                   
SESSION-ID ==> ${Scan_Id}
-------------------   SESSION CLOSED   -----------------------
`)


          let msgsss = await Hmd.sendMessage(user, { text:  Scan_Id });
          await Hmd.sendMessage(user, { text: MESSAGE } , { quoted : msgsss });
          await delay(1000);
          try{ await fs.emptyDirSync(__dirname+'/hacxk_session'); }catch(e){}


        }

       Hmd.ev.on('creds.update', saveCreds)

        if (connection === "close") {            
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            // console.log("Reason : ",DisconnectReason[reason])
            if (reason === DisconnectReason.connectionClosed) {
              console.log("Connection closed!")
             // HACXK().catch(err => console.log(err));
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server!")
            //  HACXK().catch(err => console.log(err));
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...")
              HACXK().catch(err => console.log(err));
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut!")
             // SUHAIL().catch(err => console.log(err));
            }  else {
                console.log('Connection closed with bot. Please run again.');
                console.log(reason)
              //process.exit(0)
            }
          }



      });
    } catch (err) {
        console.log(err);
       await fs.emptyDirSync(__dirname+'/hacxk_session'); 
    }
  }








  HACXK().catch(async(err) => {
    console.log(err)
    await fs.emptyDirSync(__dirname+'/hacxk_session'); 


    //// MADE WITH ZAID

});


  })


app.listen(PORT, () => console.log(`App listened on port http://localhost:${PORT}`));
