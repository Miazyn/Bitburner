/** @param {NS} ns */
export async function main(ns) {

	let allServers = [];
	let serversList = ns.scan("home");
	let nextServers = [];

	let serverHackName = ns.args[0];

	if (serverHackName == null) {
		serverHackName = "n00dles";
	}


	//GETTING ALL THE SERVERS
	while (serversList.length > 0) {

		let server = serversList.pop();
		if (!allServers.includes(server)) {
			allServers.push(server);
			nextServers = ns.scan(server);
			for (var i = 0; i < nextServers.length; i++) {
				if (!allServers.includes(nextServers[i])) {
					serversList.push(nextServers[i]);
				}
			}
		}
	}

	for (let serverName of allServers) {

		await ns.scp("early-hack-template.js", serverName);
		//ns.tprint("------------" + "------------");
		//ns.tprint("Copying file to " + serverName + "...");
		let openPorts = 0;
		if (ns.fileExists("BruteSSH.exe")) {
			//ns.tprint("------------" + "------------");
			//ns.tprint("Executing BruteSSH.exe on " + serverName + "...");
			ns.brutessh(serverName);
			openPorts++;
		}
		if (ns.fileExists("FTPCrack.exe")) {
			//ns.tprint("------------" + "------------");
			//ns.tprint("Executing FTPCrack.exe on " + serverName + "...");
			ns.ftpcrack(serverName);
			openPorts++;
		}
		if (ns.fileExists("RelaySMTP.exe")) {
			//ns.tprint("------------" + "------------");
			//ns.tprint("Executing RelaySMTP.exe on " + serverName + "...");
			ns.relaysmtp(serverName);
			openPorts++;
		}
		if (ns.fileExists("HTTPWorm.exe")) {
			//ns.tprint("------------" + "------------");
			//ns.tprint("Executing HTTPWorm.exe on " + serverName + "...");
			ns.httpworm(serverName);
			openPorts++;
		}
		if (ns.fileExists("SQLInject.exe")) {
			//ns.tprint("------------" + "------------");
			//ns.tprint("Executing SQLInject.exe on " + serverName + "...");
			ns.sqlinject(serverName);
			openPorts++;
		}
		if (ns.getServerNumPortsRequired(serverName) <= openPorts) {
			//ns.tprint("------------" + "------------");
			//ns.tprint("Finalizing process...");
			//ns.tprint("Executing NUKE.exe on " + serverName + "...")
			ns.nuke(serverName);
		}

		let ramAvailable = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
		let ramPerThread = ns.getScriptRam("early-hack-template.js");

		let threads = Math.floor(ramAvailable / ramPerThread);


		if (ns.hasRootAccess(serverName)) {
			ns.tprint("------------" + "------------");
			ns.tprint("Gained root access on " + serverName + "!!!");
			if (threads === 0) {
				ns.tprint("------------" + "------------");
				ns.tprint("Executing script with 1 thread..");
				ns.exec("early-hack-template.js", serverName, 1, serverHackName);
			} else {
				ns.tprint("------------" + "------------");
				ns.tprint("Executing script with " + threads + " threads...");
				ns.exec("early-hack-template.js", serverName, threads, serverHackName);
			}

		} else {
			ns.tprint("------------" + "------------");
			ns.tprint("Failed to get root access...");
		}
		ns.tprint("==========================" + "==========================");
		ns.tprint("Waiting...");
		await ns.sleep(500);
	}
	ns.tprint("Finished with " + allServers.length);
	//ns.tprint(allServers);
}