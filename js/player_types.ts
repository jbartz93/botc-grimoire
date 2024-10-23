export interface PlayerTypes {
  townsfolk: number
  outsiders: number
  minions: number
  demons: number
}

export function calculateTypes(count: number): PlayerTypes {
  if (count > 6) {
    return ravenswoodBluff(count);
  }
  return teensyville(count);
}

function ravenswoodBluff(count: number): PlayerTypes {
  const outsiders = (count - 7) % 3;
  const minions = Math.floor((count - outsiders - 4) / 3);
  const demons = 1;
  const townsfolk = count - outsiders - minions - demons;
  return { townsfolk, outsiders, minions, demons };
}

function teensyville(count: number): PlayerTypes {
  const outsiders = Math.max(0, count - 5);
  const minions = count > 1 ? 1 : 0;
  const demons = count == 0 ? 0 : 1;
  const townsfolk = count - outsiders - minions - demons;
  return { townsfolk, outsiders, minions, demons };
}