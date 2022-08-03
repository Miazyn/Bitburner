/** @param {NS} ns */
export async function main(ns) {
	
		var serversSeen = ['home'];

		for (var i = 0; i < serversSeen.length; i++) {
			ns.print(ns.scan(serversSeen[i]));
		}
	

}