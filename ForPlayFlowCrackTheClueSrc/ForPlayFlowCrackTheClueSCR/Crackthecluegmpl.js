import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { useStore } from '../ForPlayFlowCrackTheClueSTR/Crackthecluecntxt';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
  Platform,
  Vibration,
} from 'react-native';
import {
  forPlayFlowGameLevels,
  forPlayFlowLevelIntros,
} from '../ForPlayFlowCrackTheClueDT/forPlayFlowGameData';
import Crackthecluebckgrnd from '../ForPlayFlowCrackTheClueCMP/Crackthecluebckgrnd';

const Crackthecluegmpl = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params;
  const skipIntro = route.params?.skipIntro ?? false;
  const [introVisible, setIntroVisible] = useState(!skipIntro);
  const [sublevel, setSublevel] = useState(0);
  const [selected, setSelected] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [eggStates, setEggStates] = useState([]);
  const [resultObject, setResultObject] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showWinConfetti, setShowWinConfetti] = useState(false);

  const data = forPlayFlowGameLevels[level][sublevel];
  const totalSub = forPlayFlowGameLevels[level].length;
  const {
    forPlayWinClick,
    forPlayLoseClick,
    toggleForPlayFlowVibration,
    toggleForPlayFlowSound,
  } = useStore();

  useEffect(() => {
    const initialEggs = Array.from({ length: data.eggs }, () => 'normal');
    setEggStates(initialEggs);
    setSelected(null);
  }, [sublevel, data.eggs]);

  const handleForPlayFlowEggPress = index => {
    const newEggs = Array.from({ length: data.eggs }, (_, i) =>
      i === index ? 'selected' : 'normal',
    );
    setEggStates(newEggs);
    setSelected(index + 1);
  };

  const handleForPlayFlowConfirm = async () => {
    if (selected === null) return;

    setShowWinConfetti(false);

    const correct = selected === data.correct;
    await updateForPlayFlowStats(correct);
    const newEggs = [...eggStates];

    if (correct) {
      if (toggleForPlayFlowSound) {
        forPlayWinClick?.();
      }

      newEggs[selected - 1] = 'chick';
      setEggStates(newEggs);
      await new Promise(res => setTimeout(res, 1000));

      if (sublevel + 1 === totalSub) {
        setShowWinConfetti(true);
        setTimeout(() => setShowWinConfetti(false), 4000);

        setWin(true);
        setGameOver(true);

        const stored = await AsyncStorage.getItem(
          'forplayflow_completed_levels',
        );
        const arr = stored ? JSON.parse(stored) : [];
        if (!arr.includes(level)) {
          arr.push(level);
          await AsyncStorage.setItem(
            'forplayflow_completed_levels',
            JSON.stringify(arr),
          );
        }
      } else {
        setSublevel(sublevel + 1);
      }
    } else {
      if (toggleForPlayFlowSound) {
        forPlayLoseClick?.();
      }

      if (toggleForPlayFlowVibration) {
        Vibration.vibrate(200);
      }

      let fixedObj = 'fox';
      if (level === 2) fixedObj = 'rooster';
      else if (level === 3) fixedObj = 'money';
      else if (level === 4) fixedObj = 'corn';

      setResultObject(fixedObj);
      newEggs[selected - 1] = fixedObj;
      setEggStates(newEggs);
      setWin(false);
      setGameOver(true);

      setShowWinConfetti(false);
    }
  };

  const restartForPlayFlowLevel = () => {
    setSublevel(0);
    setSelected(null);
    setGameOver(false);
    setIntroVisible(false);
    setResultObject(null);

    const initialEggs = Array.from(
      { length: forPlayFlowGameLevels[level][0].eggs },
      () => 'normal',
    );
    setEggStates(initialEggs);
  };

  const getEggImage = state => {
    switch (state) {
      case 'selected':
        return require('../../assets/images/forplayflowegggold.png');
      case 'chick':
        return require('../../assets/images/forplayflowchick.png');
      case 'fox':
        return require('../../assets/images/forplayflowwron.png');
      case 'rooster':
        return require('../../assets/images/forplayflowroost.png');
      case 'money':
        return require('../../assets/images/forplayflowmon.png');
      case 'corn':
        return require('../../assets/images/forplayflowcorn.png');
      default:
        return require('../../assets/images/forplayflowegg.png');
    }
  };

  const updateForPlayFlowStats = async correct => {
    try {
      const correctCount = parseInt(
        (await AsyncStorage.getItem('forplayflow_correct')) || '0',
      );
      const wrongCount = parseInt(
        (await AsyncStorage.getItem('forplayflow_wrong')) || '0',
      );
      if (correct) {
        await AsyncStorage.setItem(
          'forplayflow_correct',
          String(correctCount + 1),
        );
      } else {
        await AsyncStorage.setItem('forplayflow_wrong', String(wrongCount + 1));
      }
    } catch (e) {
      console.log('Stats update error', e);
    }
  };

  return (
    <Crackthecluebckgrnd>
      <View style={styles.forplayflowcontainer}>
        {introVisible && !gameOver && (
          <>
            {Platform.OS === 'ios' ? (
              <ImageBackground
                source={require('../../assets/images/forplayflowhomebrd.png')}
                style={styles.forPlayFlowBoard}
              >
                <Image
                  source={require('../../assets/images/forplayflowhomelogo.png')}
                  style={styles.forPlayFlowImage}
                />
              </ImageBackground>
            ) : (
              <Image
                source={require('../../assets/images/icon.png')}
                style={{ width: 250, height: 250, borderRadius: 12 }}
              />
            )}

            <ImageBackground
              source={require('../../assets/images/forplayflowboard.png')}
              style={[styles.forplayflowtextBoard, { marginTop: 80 }]}
            >
              <Text style={styles.forplayflowdesc}>
                {forPlayFlowLevelIntros[level]}
              </Text>
            </ImageBackground>

            <View style={styles.buttons}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.icefishnextbtn}
                onPress={() => setIntroVisible(false)}
              >
                <ImageBackground
                  source={require('../../assets/images/forplayflowwelcbtn.png')}
                  style={styles.forplayflowbtn}
                >
                  <Text style={styles.forplayflowbtntext}>Start</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.icefishnextbtn}
                onPress={() => navigation.goBack('')}
              >
                <ImageBackground
                  source={require('../../assets/images/forplayflowwelcbtn.png')}
                  style={styles.forplayflowbtn}
                  onPress={() => setShowExitModal(true)}
                >
                  <Text style={styles.forplayflowbtntext}>Menu</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </>
        )}

        {!introVisible && !gameOver && (
          <>
            <Image
              source={require('../../assets/images/forplayflowrooster.png')}
            />
            <ImageBackground
              source={require('../../assets/images/forplayflowgameboard.png')}
              style={styles.forplaygameBoard}
            >
              <Text style={styles.forplayflowdesc}>{data.text}</Text>
              <View style={styles.forplaypaginationDots}>
                {Array.from({ length: totalSub }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i <= sublevel ? styles.dotActive : styles.dotInactive,
                    ]}
                  />
                ))}
              </View>
            </ImageBackground>

            <View style={styles.forplayeggsRow}>
              {eggStates.map((state, i) => {
                const count = data.eggs;
                let size = { width: 100, height: 120 };

                if (count === 2) size = { width: 125, height: 166 };
                else if (count === 3) size = { width: 93, height: 124 };
                else if (count === 4) size = { width: 76, height: 101 };
                else if (count === 5) size = { width: 71, height: 95 };

                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={() => handleForPlayFlowEggPress(i)}
                  >
                    <Image
                      source={getEggImage(state)}
                      style={[styles.egg, size, { resizeMode: 'contain' }]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                styles.icefishnextbtn,
                selected === null && { opacity: 0.5 },
                { marginBottom: 10 },
              ]}
              disabled={selected === null}
              onPress={handleForPlayFlowConfirm}
            >
              <ImageBackground
                source={require('../../assets/images/forplayflowwelcbtn.png')}
                style={styles.forplayflowbtn}
              >
                <Text style={styles.forplayflowbtntext}>Confirm</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.icefishnextbtn}
              onPress={() => setShowExitModal(true)}
            >
              <ImageBackground
                source={require('../../assets/images/forplayflowwelcbtn.png')}
                style={styles.forplayflowbtn}
              >
                <Text style={styles.forplayflowbtntext}>Menu</Text>
              </ImageBackground>
            </TouchableOpacity>
          </>
        )}

        {gameOver && (
          <View style={styles.centered}>
            {win ? (
              <>
                <Image
                  source={require('../../assets/images/forplayflowroostwin.png')}
                />
              </>
            ) : (
              <Image
                source={require('../../assets/images/forplayflowroostlose.png')}
              />
            )}
            {showWinConfetti && (
              <Image
                source={require('../../assets/images/forplayflowwinfire.gif')}
                style={{ position: 'absolute', top: -120, zIndex: 2 }}
              />
            )}
            <ImageBackground
              source={require('../../assets/images/forplayflowgameboard.png')}
              style={styles.forplaygameBoard}
            >
              <Text style={styles.resultText}>
                {win
                  ? 'Congratulations! You solved all the clues in this stage. The chick is proud of you!'
                  : 'Game Over\nYou couldn’t find the chick'}
              </Text>
            </ImageBackground>
            <View style={styles.forplayeggsRow}>
              {eggStates.map((state, i) => {
                const count = data.eggs;
                let size = { width: 100, height: 120 };

                if (count === 2) size = { width: 125, height: 166 };
                else if (count === 3) size = { width: 93, height: 124 };
                else if (count === 4) size = { width: 76, height: 101 };
                else if (count === 5) size = { width: 71, height: 95 };

                return (
                  <Image
                    key={i}
                    source={getEggImage(state)}
                    style={[styles.egg, size, { resizeMode: 'contain' }]}
                  />
                );
              })}
            </View>
            {win && level < 4 ? (
              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.icefishnextbtn, { marginBottom: 10 }]}
                onPress={() =>
                  navigation.replace('Crackthecluegmpl', {
                    level: level + 1,
                    skipIntro: true,
                  })
                }
              >
                <ImageBackground
                  source={require('../../assets/images/forplayflowwelcbtn.png')}
                  style={styles.forplayflowbtn}
                >
                  <Text style={styles.forplayflowbtntext}>Next Level</Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[styles.icefishnextbtn, { marginBottom: 10 }]}
                  onPress={restartForPlayFlowLevel}
                >
                  <ImageBackground
                    source={require('../../assets/images/forplayflowwelcbtn.png')}
                    style={styles.forplayflowbtn}
                  >
                    <Text style={styles.forplayflowbtntext}>Restart</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.icefishnextbtn}
              onPress={() => setShowExitModal(true)}
            >
              <ImageBackground
                source={require('../../assets/images/forplayflowwelcbtn.png')}
                style={styles.forplayflowbtn}
              >
                <Text style={styles.forplayflowbtntext}>Menu</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={showExitModal}
        statusBarTranslucent={Platform.OS === 'android'}
      >
        {Platform.OS === 'ios' && (
          <BlurView
            style={styles.forplaymodalBlur}
            blurType="light"
            blurAmount={1}
          />
        )}
        <View style={styles.forplaymodaloverlay}>
          <ImageBackground
            source={require('../../assets/images/forplayflowmodal.png')}
            style={styles.forplayexitModal}
          >
            <Text style={styles.forplaymodalText}>
              Are you sure you want to return to the menu? Your current level
              progress will be lost.
            </Text>
          </ImageBackground>
          <View style={styles.forplaymodalButtons}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setShowExitModal(false);
                navigation.goBack('');
              }}
            >
              <Image
                source={require('../../assets/images/forplayflowconf.png')}
                style={styles.forplaymodalIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowExitModal(false)}
            >
              <Image
                source={require('../../assets/images/forplayflowexit.png')}
                style={styles.forplaymodalIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Crackthecluebckgrnd>
  );
};

const styles = StyleSheet.create({
  forplayflowcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  forplayflowbtn: {
    width: 150,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forplaypaginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 15,
  },
  forplaymodaloverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.51)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forplayexitModal: {
    width: 332,
    minHeight: 121,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forplaymodalText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  forplaymodalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    marginTop: 5,
  },
  forplaymodalIcon: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotActive: {
    backgroundColor: '#F5D340',
  },
  dotInactive: {
    backgroundColor: '#0C0C0C',
  },
  forplaymodalBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  forplayflowbtntext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forplaygameBoard: {
    width: 368,
    minHeight: 134,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 30,
  },
  titleBoard: {
    width: 240,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forplayflowboard: {
    width: 366,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  forplayflowwimage: { top: -10 },
  titleText: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  forplayflowtextBoard: {
    width: 350,
    minHeight: 255,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginVertical: 20,
    marginBottom: 80,
  },
  forplayflowdesc: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 23,
    fontWeight: '500',
  },
  buttons: { gap: 10 },
  forplayeggsRow: {
    flexDirection: 'row',
    gap: 25,
    marginVertical: 30,
    marginTop: 50,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  egg: { width: 80, height: 100, resizeMode: 'contain' },
  menuBtn: { marginTop: 20 },
  centered: { alignItems: 'center', justifyContent: 'center' },
  resultText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 26,
  },
});

export default Crackthecluegmpl;
