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

		if (ns.hasRootAccess(serverName)) {
			ns.tprint("------------" + "------------");
			ns.tprint("Has root access on " + serverName + "!!!");
			ns.killall(serverName);
			ns.tprint("Killed all scripts running");
		}
		ns.tprint("==========================" + "==========================");
		ns.tprint("Waiting...");
		await ns.sleep(200);
	}
	ns.tprint("Finished with " + allServers.length);
	ns.tprint("Booting deployer.js...");
	await ns.sleep(1000);
	ns.exec("v3/deployer3.js", "home", 1);

}