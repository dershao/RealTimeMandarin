import React , {useState} from 'react';
import CanvasView from './views/CanvasView.js';
import MainView from './views/MainView.js';
import WordsView from './views/WordsView.js';
import SummaryView from './views/SummaryView';
import {views} from './constants.js';

function App() {

  const [view, setView] = useState(views.MAIN);
  const [characters, setCharacters] = useState([]);
  const [correct, setCorrect] = useState(new Array(3));

  const setPageView = (view) => {
    setView(view);
  };

  return (
    <div className="App">
      {view === views.MAIN && <MainView setPageView={setPageView}
                                        setCharacters={setCharacters}/>}

      {view === views.WORD && <WordsView setPageView={setPageView}
                                         characters={characters}/>}

      {view === views.CANVAS && <CanvasView setPageView={setPageView}
                                            characters={characters}
                                            setCorrect={setCorrect}/>}

      {view === views.SUMMARY && <SummaryView setPageView={setPageView}
                                              characters={characters}
                                              correct={correct}/>}
    </div>
  );
}

export default App;
