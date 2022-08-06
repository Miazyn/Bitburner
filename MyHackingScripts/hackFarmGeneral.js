/** @param {NS} ns */
export async function main(ns) {

	let serverToMine = ns.args[0];


	while (true) {

		await ns.weaken(serverToMine);

	}


}