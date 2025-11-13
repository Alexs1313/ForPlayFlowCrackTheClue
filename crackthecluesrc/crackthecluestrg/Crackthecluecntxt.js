import React, { createContext, useContext, useState } from 'react';
import Sound from 'react-native-sound';

export const StoreContext = createContext(undefined);

export const useStore = () => useContext(StoreContext);

export const SoundContextProvider = ({ children }) => {
  const [toggleForPlayFlowVibration, setToggleForPlayFlowVibration] =
    useState(false);
  const [toggleForPlayFlowSound, setToggleForPlayFlowSound] = useState(false);

  const forPlayWinClick = () => {
    const clickSound = new Sound(
      'open-new-level-143027.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        clickSound.play(success => {
          if (!success) {
            console.log('Sound playback failed');
          }
          clickSound.release();
        });
      },
    );
  };

  const forPlayLoseClick = () => {
    const clickSound = new Sound(
      'brass-fail-1-a-185074 (1).mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        clickSound.play(success => {
          if (!success) {
            console.log('Sound playback failed');
          }
          clickSound.release();
        });
      },
    );
  };

  const value = {
    toggleForPlayFlowVibration,
    setToggleForPlayFlowVibration,
    toggleForPlayFlowSound,
    setToggleForPlayFlowSound,
    forPlayWinClick,
    forPlayLoseClick,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
