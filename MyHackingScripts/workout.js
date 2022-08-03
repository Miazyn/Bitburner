/** @param {NS} ns */
export async function main(ns) {

	let Player = ns.getPlayer();

	while (Player.agility < 200 || Player.strength < 200 || Player.defense < 200 || Player.dexterity < 200) {

		if (Player.agility < 200) {

			ns.gymWorkout('iron gym', 'Agility', true);
			await ns.sleep(600000);
			ns.stopAction();
		}
		else if (Player.strength < 200) {
			ns.gymWorkout('iron gym', 'Strength', true);
			await ns.sleep(600000);
			ns.stopAction();
		}
		else if (Player.defense < 200) {
			ns.gymWorkout('iron gym', 'Defense', true);
			await ns.sleep(600000);
			ns.stopAction();
		}
		else if (Player.dexterity < 200) {
			ns.gymWorkout('iron gym', 'Dexterity', true);
			await ns.sleep(600000);
			ns.stopAction();
		}
		Player = ns.getPlayer();

	}


}