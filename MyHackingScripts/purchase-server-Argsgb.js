/** @param {NS} ns */
export async function main(ns) {

	var ram = ns.args[0];

	var i = 0;

	while (i < ns.getPurchasedServerLimit()) {

		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram) * 1.5) {
			var hostname = ns.purchaseServer("pserv-" + i, ram);
			await ns.scp("early-hack-template.js", hostname);
			ns.exec("early-hack-template.js", hostname, 3, "n00dles");
			i++;
			ns.alert("Purchased Server");
		}


	}
	ns.alert("Purchased all servers");

	ns.exit();

}