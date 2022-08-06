/** @param {NS} ns */
export async function main(ns) {

	ns.exec("killSwitch.js", "home", 1);
	ns.exec("deployer.js", "home", 1, 'n00dles');
	ns.exec("purchase-server-8gb.script" , "home", 1);
}