/** @param {NS} ns */
export async function main(ns) {
	ns.tprint("===========================");
	ns.tprint("STYLES:");
	ns.tprint(ns.ui.getStyles());
	await ns.sleep(1000);
	ns.tprint("===========================");
	ns.tprint("THEMES: ");
	ns.tprint(ns.ui.getTheme());
	await ns.sleep(1000);
	ns.tprint("===========================");
	ns.tprint("GAME INFO: ");
	ns.tprint(ns.ui.getGameInfo());
	await ns.sleep(1000);
	ns.tprint("===========================");

}