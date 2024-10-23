import { Player } from './player';

export interface PlayerAction {
  type: 'name' | 'travelling' | 'status'
  id: string
  name?: string
}

export function playersReducer(players: Array<Player>, action: PlayerAction) {
  const player = players.find(player => player.getId() == action.id);
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
  }
}