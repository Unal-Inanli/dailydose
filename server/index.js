const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const snoowrap = require('snoowrap');
require('dotenv').config();

const r = new snoowrap({
  userAgent: 'DailyDoseWebApp (by /u/spartanUI)',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
    });


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()


app.post("/GetRandom", (req, res) => {
  
  var list;
 
  r.getRandomSubmission().then((response) => {
    list = response;
    console.log(list);
    res.send({list: list});
  }).catch((error) => {
    res.send(error)
  }); 

});