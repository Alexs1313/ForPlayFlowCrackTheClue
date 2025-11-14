import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ForPlayFlowBackground from '../ForPlayFlowCrackTheClueCMP/Crackthecluebckgrnd';
import Crackthecluebckgrnd from '../ForPlayFlowCrackTheClueCMP/Crackthecluebckgrnd';

const Crackthecluewlcm = () => {
  const [forPlayFlowIndex, setForPlayFlowIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <Crackthecluebckgrnd>
      <View style={styles.icefishcontainer}>
        {forPlayFlowIndex === 0 && (
          <Image
            source={require('../../assets/images/forplayflowonb1.png')}
            style={styles.icefishimage}
          />
        )}
        {forPlayFlowIndex === 1 && (
          <Image
            source={require('../../assets/images/forplayflowonb2.png')}
            style={styles.icefishimage}
          />
        )}
        {forPlayFlowIndex === 2 && (
          <Image
            source={require('../../assets/images/forplayflowonb3.png')}
            style={styles.icefishimage}
          />
        )}
        {forPlayFlowIndex === 3 && (
          <Image
            source={require('../../assets/images/forplayflowonb4.png')}
            style={styles.icefishimage}
          />
        )}
        <ImageBackground
          source={require('../../assets/images/forplayflowboard.png')}
          style={styles.icefishwelcomeboard}
        >
          <Text style={styles.icefishwelcometext}>
            {forPlayFlowIndex === 0 &&
              'Welcome to For Play Flow – Crack the Clue'}
            {forPlayFlowIndex === 1 && 'How It Works'}
            {forPlayFlowIndex === 2 && 'Progress Through Levels'}
            {forPlayFlowIndex === 3 && 'Stay Focused'}
          </Text>
          <Text style={styles.icefishwelcomesubtitle}>
            {forPlayFlowIndex === 0 &&
              'A playful logic game where every clue hides a twist. Read carefully, think twice, and find where the real chick is waiting.'}
            {forPlayFlowIndex === 1 &&
              'Each round shows a set of eggs and a single clue. Tap the egg you believe hides the chick and confirm your choice. Logic, not luck, will lead you forward.'}
            {forPlayFlowIndex === 2 &&
              'There are four stages, each adding new farm characters and more complex clues. Finish all five puzzles in a stage to unlock the next one.'}
            {forPlayFlowIndex === 3 &&
              'Every correct answer brings you closer to victory. A wrong one sends you back to the start of the level. Read between the lines, trust your reasoning — and crack the clue!'}
          </Text>
        </ImageBackground>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.icefishnextbtn}
          onPress={() => {
            if (forPlayFlowIndex < 3) {
              setForPlayFlowIndex(forPlayFlowIndex + 1);
            } else {
              navigation.replace('Crackthecluemnscr');
            }
          }}
        >
          <ImageBackground
            source={require('../../assets/images/forplayflowwelcbtn.png')}
            style={styles.forplayflowbtn}
          >
            <Text style={styles.forplayflowbtntext}>
              {forPlayFlowIndex < 3 ? 'Next' : 'Start'}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </Crackthecluebckgrnd>
  );
};

const styles = StyleSheet.create({
  icefishcontainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  icefishwelcomeboard: {
    width: 354,
    height: 261,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icefishnextbtn: {
    marginBottom: 43,
    marginTop: 23,
  },
  icefishimage: {
    top: 20,
    zIndex: 2,
  },
  icefishwelcometext: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  icefishwelcomesubtitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 20,
    marginHorizontal: 30,
    fontStyle: 'italic',
  },
  forplayflowbtn: {
    width: 114,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forplayflowbtntext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Crackthecluewlcm;
