import { Player } from './player';

export interface PlayerAction {
  type: 'name' | 'travelling' | 'status' | 'up' | 'down'
  id: string
  name?: string
}

export function playersReducer(players: Array<Player>, action: PlayerAction) {
  const playerIndex = players.findIndex(player => player.getId() == action.id);
  const player = players[playerIndex];
  switch (action.type) {
    case 'name':
      player.setName(action.name);
      return players.concat();
    case 'travelling':
      player.setTravelling(!player.isTravelling());
      return players.concat();
    case 'status':
      player.rotateStatus();
      return players.concat();
    case 'up':
    case 'down':
      const swapIndex = (playerIndex + players.length + (action.type == 'up' ? -1 : 1)) % players.length;
      const swap = players[swapIndex];
      players[swapIndex] = player;
      players[playerIndex] = swap;
      return players.concat();
  }
}