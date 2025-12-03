import { ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../CrackTheClueStore/Crackthecluecntxt';

const FORPLAYFLOW_BACKGROUND = 'forplayflow_background';

const Crackthecluebckgrnd = ({ children }) => {
  const { forPlayFlowId, setForPlayFlowId } = useStore();

  useEffect(() => {
    loadBackground();
  }, []);

  const loadBackground = async () => {
    const saved = await AsyncStorage.getItem(FORPLAYFLOW_BACKGROUND);
    setForPlayFlowId(saved ? parseInt(saved) : 1);
  };

  // Массив всех доступных фонов
  const backgrounds = {
    1: require('../../assets/images/forplayflowbg.png'),
    2: require('../../assets/images/forplayflowbg2.png'),
    3: require('../../assets/images/forplayflowb3.png'),
    4: require('../../assets/images/forplayflowb4.png'),
  };

  const selectedBG = backgrounds[forPlayFlowId] || backgrounds[1];

  return (
    <ImageBackground source={selectedBG} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Crackthecluebckgrnd;
