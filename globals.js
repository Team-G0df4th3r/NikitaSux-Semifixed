//=====================================================
// main libraries
global.request 	= require('request');
global.fs	= require('fs');
global.zlib 	= require('zlib');
global.http 	= require('https');
//=====================================================
// global variables to change
global.gameVersion 	= ''; // should be auto updated
global.launcherVersion 	= ''; // should be auto updated
global.PHPSESSID 	= ''; // this need to be empty it will updated by script
global.launcher_url 	= "launcher.escapefromtarkov.com"; 	// launcher backend
global.url 		= "prod.escapefromtarkov.com";		// game backend
global.url_trade 	= "trading.escapefromtarkov.com";	// trading backend
global.url_ragfair 	= "ragfair.escapefromtarkov.com";	// ragfair backend (not sure if im not done any typo there)
global.userAgent 	= 'UnityPlayer/2018.4.11f1 (UnityWebRequest/1.0, libcurl/7.52.0-DEV)'; // take that in mind to update it from time to time
global.backendVersion 	= '6';
global.taxonomyVersion 	= '341';
////////// 
global.integer 		= 0; 		// incrementor used to not get banned ? who fucking knows
global.cookieString 	= ''; 	// not use ?
global.L_TOKEN 		= ''; 		// not use ?
global.profileID 	= ''; 		// your profile ID you should update it after login to game
global.language 	= 'en'; 	// not use ?
//=====================================================
// Local Script files
global.util 		= require('./utility.js');
global.launcher_f 	= require('./_launcher.js');
global.client_f 	= require('./_client.js');