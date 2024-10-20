import { ArrowUp, ArrowDown } from './icons';

export function Grimoire({ rows }: { rows: number }) {
  return (
    <>
      <Header />
      <Table rows={rows} />
    </>
  );
}

function Header() {
  return (
    <>
      <div className="header">
        <div className="townsfolk">
          <span id="townsfolk">0</span> townsfolk
        </div>
        <div className="outsiders">
          <span id="outsiders">0</span> outsiders
        </div>
        <div className="minions">
          <span id="minions">0</span> minions
        </div>
        <div className="demon">
          <span id="demon">0</span> demon
        </div>
      </div>
      <div className="header">
        <div>
          <span id="alive">0</span> alive
        </div>
        <div>
          <span id="majority">0</span> majority
        </div>
        <div>
          <span id="votes">0</span> votes available
        </div>
        <div>
          <span id="total">0</span> total
        </div>
      </div>
    </>
  );
}

function Table({ rows }: { rows: number }) {
  return (
    <div className="tableContainer">
      <Column players={rows} className="left"></Column>
      <div className="table"></div>
      <Column players={rows} className="right"></Column>
    </div>
  );
}

function Column({ players, className }: { players: number, className: string }) {
  const dom = [];
  for (let i = 0; i < players; i++) {
    dom.push(<div className="player">
      <div className="button arrow up"><ArrowUp /></div>
      <div className="button arrow down"><ArrowDown /></div>
      <input type="text" className="name"></input>
      <div className="button traveller"></div>
      <div className="button status"></div>
    </div>);
  }
  return <div className={"column " + className}>{dom}</div>;
}