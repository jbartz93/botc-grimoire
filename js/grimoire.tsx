import { Alive, ArrowUp, ArrowDown, Dead, OneVote, Traveller } from './icons';
import { ChangeEvent, useReducer } from 'react';
import { calculateTypes } from './player_types';
import { PlayerAction, playersReducer } from './players_reducer';
import { Player } from './player';
import { Status } from './status';

export function Grimoire({ rows }: { rows: number }) {
  const [players, dispatch] = useReducer(playersReducer, rows, (rows) => {
    const players = [];
    for (let i = 0; i < rows * 2; i++) {
      players.push(new Player(`p${i}`));
    }
    return players;
  })
  return (
    <>
      <Header players={players} />
      <Table players={players} dispatch={dispatch} />
    </>
  );
}

function Header({ players }: { players: Array<Player> }) {
  const types = calculateTypes(players.filter(player => player.isPlayingNotTravelling()).length);
  const alive = players.filter(player => player.isAlive()).length;
  const majority = Math.ceil(alive / 2);
  const votes = players.filter(player => player.hasVote()).length;
  const total = players.filter(player => player.isPlaying()).length;
  return (
    <>
      <div className="header">
        <div className="townsfolk">
          {types.townsfolk} townsfolk
        </div>
        <div className="outsiders">
          {types.outsiders} {types.outsiders == 1 ? 'outsider' : 'outsiders'}
        </div>
        <div className="minions">
          {types.minions} {types.minions == 1 ? 'minion' : 'minions'}
        </div>
        <div className="demon">
          {types.demons} {types.demons == 1 ? 'demon' : 'demons'}
        </div>
      </div>
      <div className="header">
        <div>
          {alive} alive
        </div>
        <div>
          {majority} majority
        </div>
        <div>
          {votes} {votes == 1 ? 'vote' : 'votes'} available
        </div>
        <div>
          {total} total
        </div>
      </div>
    </>
  );
}

function Table({ players, dispatch }: { players: Array<Player>, dispatch: React.Dispatch<PlayerAction> }) {
  const leftPlayers = players.slice(0, players.length / 2);
  const rightPlayers = players.slice(players.length / 2);
  return (
    <div className="tableContainer">
      <Column players={leftPlayers} dispatch={dispatch} className="left"></Column>
      <div className="table"></div>
      <Column players={rightPlayers} dispatch={dispatch} className="right"></Column>
    </div>
  );
}

function Column({ players, className, dispatch }: { players: Array<Player>, className: string, dispatch: React.Dispatch<PlayerAction> }) {
  const dom = [];
  for (let i = 0; i < players.length; i++) {
    dom.push(<PlayerRow player={players[i]} dispatch={dispatch} key={players[i].getId()} />);
  }
  return <div className={"column " + className}>{dom}</div>;
}

function PlayerRow({ player, dispatch }: { player: Player, dispatch: React.Dispatch<PlayerAction> }) {
  function changeName(e: ChangeEvent) {
    dispatch({ type: 'name', id: player.getId(), name: (e.target as HTMLInputElement).value });
  }

  function changeStatus() {
    dispatch({ type: 'status', id: player.getId() });
  }

  function changeTravelling() {
    dispatch({ type: 'travelling', id: player.getId() });
  }

  const activeTraveller = player.isTravelling() ? ' active' : '';
  return (<div className={player.isPlaying() ? "player occupied" : "player"}>
    <div className="button arrow up"><ArrowUp /></div>
    <div className="button arrow down"><ArrowDown /></div>
    <input type="text" value={player.getName()} className="name" onChange={changeName} />
    <div className={"button traveller" + activeTraveller} onClick={changeTravelling}>
      {player.isPlaying() && (<Traveller />)}
    </div>
    <div className="button status" onClick={changeStatus}>
      <PlayerIcon status={player.getStatus()} />
    </div>
  </div>);
}

function PlayerIcon({ status }: { status: Status }) {
  switch (status) {
    case Status.ALIVE:
      return <Alive />;
    case Status.ONE_VOTE:
      return <OneVote />;
    case Status.DEAD:
      return <Dead />;
    default:
      return null;
  }
}