import React, {useEffect, useState} from 'react';
import KlesunProductionsIntro from './Components/Intro';
import MainGame from "./Components/Game";

function App({skipIntro}) {
  const [showIntro, setShowIntro] = useState(skipIntro ? false : null);
  const [introEnded, setIntroEnded] = useState(skipIntro ? true : null);

  useEffect( () => {
    if (!skipIntro)
    {
      setShowIntro(true);
      setIntroEnded(false);

      setTimeout( () => {
        setShowIntro(false);
        setIntroEnded(true);
      }, 6000);
    }
  }, [] );

  return (
    <React.Fragment>
      {
        showIntro
          ? (
            <KlesunProductionsIntro />
          )
          : null
      }
      {
        !showIntro && introEnded
          ? (
            <MainGame />
          )
          : null
      }
    </React.Fragment>
  );
}

export default App;
