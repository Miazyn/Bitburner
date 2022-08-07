/** @param {NS} ns */
export async function main(ns) {

	let boughtServers = ns.getPurchasedServers();
	let ram = ns.args[0];

	if (ram == null) {
		ram = 512;
	}
	let counterOfServerReplaced = 0;
	while (counterOfServerReplaced < ns.getPurchasedServerLimit()) {
		
		for (let i = 0; i < boughtServers.length; i++) {
			if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram) * 1.5) {
				//YES WE CAN BUY
				if (ns.getServerMaxRam(boughtServers[i]) < ram) {
					let serverName = boughtServers[i];

					ns.killall(boughtServers[i]);
					ns.deleteServer(boughtServers[i]);

					var hostname = ns.purchaseServer(serverName, ram);

					let ramAvailable = ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);
					let ramPerThread = ns.getScriptRam("early-hack-template.js");

					let threads = Math.floor(ramAvailable / ramPerThread);
					await ns.scp("early-hack-template.js", hostname);
					if (threads === 0) {
						ns.exec("early-hack-template.js", hostname, 1, 'n00dles');
					} else {
						ns.exec("early-hack-template.js", hostname, threads, 'n00dles');
					}
					ns.tprint("=====================================");
					ns.tprint("Purchased a new server with " + ram + "RAM.");
					ns.tprint("Current server on: " + counterOfServerReplaced);
					ns.tprint("=====================================");
					ns.tprint("Continueing...");

					counterOfServerReplaced++;
				}
				if (ns.getServerMaxRam(boughtServers[i]) === ram) {

					ns.tprint("=====================================");
					ns.tprint("Already improved server with " + ram + "RAM.");
					ns.tprint("Current server on: " + counterOfServerReplaced);
					ns.tprint("=====================================");
					ns.tprint("Continueing...");
					counterOfServerReplaced++;
				}
			}
			await ns.sleep(2000);
		}
		await ns.sleep(10000);
	}
	ns.tprint("Finished upgrading/buying Servers");
}