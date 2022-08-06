/** @param {NS} ns */
export async function main(ns) {

	let servers = ns.scan("home");
	let serverHackName = "n00dles";
	ns.tprint(servers);

	for (let serverName of servers) {

		await ns.scp("early-hack-template.js", serverName);

		let openPorts = 0;
		if (ns.fileExists("BruteSSH.exe")) {
			ns.brutessh(serverName);
			openPorts++;
		}
		if (ns.fileExists("FTPCrack.exe")) {
			ns.ftpcrack(serverName);
			openPorts++;
		}
		if (ns.fileExists("RelaySMTP.exe")) {
			ns.relaysmtp(serverName);
			openPorts++;
		}
		if (ns.fileExists("HTTPWorm.exe")) {
			ns.httpworm(serverName);
			openPorts++;
		}
		if (ns.fileExists("SQLInject.exe")) {
			ns.sqlinject(serverName);
			openPorts++;
		}
		if (ns.getServerNumPortsRequired(serverName) <= openPorts) {
			ns.nuke(serverName);
		}

		let ramAvailable = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
		let ramPerThread = ns.getScriptRam("early-hack-template.js");

		let threads = Math.floor(ramAvailable / ramPerThread);


		if (ns.hasRootAccess(serverName)) {
			if (threads === 0) {
				ns.exec("early-hack-template.js", serverName, 1, serverHackName);
			} else {

				ns.exec("early-hack-template.js", serverName, threads, serverHackName);
			}
		}
	}
}
