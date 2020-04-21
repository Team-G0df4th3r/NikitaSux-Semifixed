
require('./globals.js');

const paths = [
	/* 0	*/ "/launcher/token/refresh",
	/* 1	*/ "/launcher/hardwareCode/activate",
	/* 2	*/ "/launcher/logout",
	/* 3	*/ "/launcher/login",
	/* 4	*/ "/launcher/queue/status",
	/* 5	*/ "/launcher/game/start",
	/* 6	*/ "/launcher/analytics",
	/* 7	*/ "/launcher/config",
	/* 8	*/ "/launcher/setDataCenters",
	/* 9	*/ "/launcher/dataCenter/list",
	/* 10	*/ "/launcher/server/list",
	/* 11	*/ "/launcher/GetUnpackedDistrib?version={yourgameversion}",
	/* 12	*/ "/launcher/GetPatchList",
	/* 13	*/ "/launcher/GetLauncherDistrib",
	/* 14	*/ "/launcher/GetDistrib"
]

/* **** SENDER FUNCTION **** */
function send_launcher(url, _port = 443, path, data){
	return new Promise ((resolve, reject) => {
		const options = { // options for https data it must stay like this
		  hostname: url,
		  port: _port,
		  path: path,
		  method: 'POST',
		  headers: {
			  'User-Agent':			'BSG Launcher ' + launcherVersion,
			  'Content-Type': 		'application/json',
			  'Method': 			'POST'//,
			  //'Authorization': 		'{ACCESS TOKEN GO THERE}'
		  } 
		};
		zlib.deflate(data, function (err, buffer) { // this is kinda working
			const req = http.request(options, (res) => { // request https data with options above
				// check if PHPSESSID isnt setted already - for more then 1 request
				if(PHPSESSID == '') 
					PHPSESSID = res.headers['set-cookie'][1].replace("; path=/", "").replace("PHPSESSID=",""); // properly grab PHPSESSID from server
				if(L_TOKEN == '')
					L_TOKEN = '';
					// display whats going on
				console.log("[URL] " + path + " [StatusCode]" + res.statusCode); 

				let chunks = [];
				res.on('data', (d) => {
					chunks.push(d);
				});
				res.on('end', function(){
					resolve(Buffer.concat(chunks));
				});
			});
			// return error if error on request
			req.on('error', err => {
				reject(err); 
			});
			req.write(buffer);
			req.end();
		});
	});
}
/* **** MAIN EXECUTABLE FUNCTION **** */
async function LauncherRequests(){
	let path = paths;
	InternalRequest_Launcher(launcher_url, path[14], "");
	InternalRequest_Launcher(launcher_url, path[13], "");
}
/* **** SEPARATE URL RESOLVER FUNCTION **** */
async function InternalRequest_Launcher(launcher_url, path, data){
	let res = await send_launcher(launcher_url, 443, path, data);
	let body = await zlibBody(res, path);
	let filename = "downloaded/" + path.substr(1).replace(/\//g, ".") + ".json";
	body = body.toString("utf-8");
	if(body != ""){
		if(path == "/launcher/GetDistrib"){ 		// gameVersion
			let tempData = JSON.parse(body);
			gameVersion	= tempData['data']['Version'];
			console.log("[VERSIONS] game:" + gameVersion);
		}
		if(path == "/launcher/GetLauncherDistrib"){ // launcherVersion
			let tempData = JSON.parse(body);
			launcherVersion	= tempData['data']['Version'];
			console.log("[VERSIONS] launcher:" + launcherVersion);
		}
	} else {
		console.log(body);
	}
	/*if(path == "/launcher/login"){}*/
	util.writeJson(filename, body);
	util.sleep(1000);
}
/* **** BODY_DEFLATE FUNCTION **** */
function zlibBody(res, path){
	return new Promise( function( resolve, reject ) {
		zlib.inflate(res, function(err, buffer) {
			if(err){
				console.log("Error with inflate:");
				reject(err);
			}
			resolve(buffer);
		});
	});
}

// export only executable function
module.exports.LauncherRequests = LauncherRequests;
