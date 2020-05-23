import React , {useState} from 'react';
import CanvasView from './views/CanvasView.js';
import MainView from './views/MainView.js';
import WordsView from './views/WordsView.js';
import {views} from './constants.js';

function App() {

  const [view, setView] = useState(views.MAIN);
  const [characters, setCharacters] = useState([]);

  const setPageView = (view) => {
    setView(view);
  };

  return (
    <div className="App">
      {view === views.CANVAS && <CanvasView setPageView={setPageView} characters={characters}/>}
      {view === views.MAIN && <MainView setPageView={setPageView} setCharacters={setCharacters}/>}
      {view === views.WORD && <WordsView setPageView={setPageView} characters={characters}/>}
    </div>
  );
}

export default App;
