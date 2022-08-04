/** @param {NS} ns */
export async function main(ns) {

	let servers = ns.scan("home");

	ns.tprint(servers);

	for (let serverName of servers) {

		await ns.scp("early-hack-template.js", serverName);

		let openPorts = 0;
		if (ns.fileExists("BruteSSH.exe")) {
			ns.brutessh(server);
			openPorts++;
		}
		if (ns.fileExists("FTPCrack.exe")) {
			ns.ftpcrack(server);
			openPorts++;
		}
		if (ns.fileExists("RelaySMTP.exe")) {
			ns.relaysmtp(server);
			openPorts++;
		}
		if (ns.fileExists("HTTPWorm.exe")) {
			ns.httpworm(server);
			openPorts++;
		}
		if (ns.fileExists("SQLInject.exe")) {
			ns.sqlinject(server);
			openPorts++;
		}
		if (ns.getServerNumPortsRequired(server) <= openPorts) {
			ns.nuke(server);
		}

		let ramAvailable = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
		let ramPerThread = ns.getScriptRam("early-hack-template.js");

		let threads = Math.floor(ramAvailable / ramPerThread);

		if (ns.hasRootAccess(serverName)) {
			ns.exec("early-hack-template.js", serverName, threads, "n00dles");
		}
	}
}