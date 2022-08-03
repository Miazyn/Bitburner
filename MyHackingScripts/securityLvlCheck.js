/** @param {NS} ns */
export async function main(ns) {

	var serv = ns.getHostname();

	ns.tprint(ns.getServerMinSecurityLevel(serv));

}