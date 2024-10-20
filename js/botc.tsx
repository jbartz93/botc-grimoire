import { Grimoire } from './grimoire';
import * as ReactDOM from 'react-dom/client'

function constructDom() {
  const params = new URL(document.location.href).searchParams;
  const players = params.has('players') ? parseInt(params.get('players'), 10) : 16;
  const rows = Math.ceil(players / 2);
  const root = ReactDOM.createRoot(document.body);
  root.render(<Grimoire rows={rows} />);
}

if (document.readyState == 'complete') {
  constructDom();
} else {
  window.addEventListener('load', constructDom);
}


