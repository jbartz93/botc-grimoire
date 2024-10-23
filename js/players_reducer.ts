import { Player } from './player';

export interface PlayerAction {
  type: 'name' | 'travelling' | 'status'
  index: number
  name?: string
}

export function playersReducer(players: Array<Player>, action: PlayerAction) {
  switch (action.type) {
    case 'name':
      players[action.index].setName(action.name);
      return players.concat();
    case 'travelling':
      players[action.index].setTravelling(!players[action.index].isTravelling());
      return players.concat();
    case 'status':
      players[action.index].rotateStatus();
      return players.concat();
  }
}