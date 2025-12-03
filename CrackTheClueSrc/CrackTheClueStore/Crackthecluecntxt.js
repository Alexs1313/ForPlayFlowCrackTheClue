import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Sound from 'react-native-sound';

export const StoreContext = createContext(undefined);

export const useStore = () => useContext(StoreContext);

const FORPLAYFLOW_BACKGROUND = 'forplayflow_background';

export const SoundContextProvider = ({ children }) => {
  const [toggleForPlayFlowVibration, setToggleForPlayFlowVibration] =
    useState(false);
  const [toggleForPlayFlowSound, setToggleForPlayFlowSound] = useState(false);

  const [forPlayFlowId, setForPlayFlowId] = useState(1);

  useEffect(() => {
    loadForPlayFlowBackground();
  }, []);

  const loadForPlayFlowBackground = async () => {
    const saved = await AsyncStorage.getItem(FORPLAYFLOW_BACKGROUND);
    setForPlayFlowId(saved ? parseInt(saved) : 1);
  };

  const updateForPlayFlowBackground = async newBgId => {
    await AsyncStorage.setItem(FORPLAYFLOW_BACKGROUND, String(newBgId));
    setForPlayFlowId(newBgId);
  };

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
    forPlayFlowId,
    setForPlayFlowId,
    updateForPlayFlowBackground,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
