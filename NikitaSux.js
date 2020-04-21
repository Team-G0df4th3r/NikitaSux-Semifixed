/* **** created by TheMaoci version 1.0 **** */

require('./globals.js');

/* ************************************************************************************************************* */

console.log(">Launcher Url: " + launcher_url);
console.log(">Game Url: " + url);
console.log(">Trading Url: " + url_trade);
/* **** starting dumping launcher responses **** */
console.log("game and launcher versions ...");
launcher_f.LauncherRequests();
/* **** starting dumping game responses **** */
client_f.ClientRequests();
/* **** Finished **** */
