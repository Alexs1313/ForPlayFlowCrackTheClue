import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ForPlayFlowBackground from '../ForPlayFlowCrackTheClueCMP/Crackthecluebckgrnd';
import { useStore } from '../ForPlayFlowCrackTheClueSTR/Crackthecluecntxt';
import { BlurView } from '@react-native-community/blur';
import Crackthecluebckgrnd from '../ForPlayFlowCrackTheClueCMP/Crackthecluebckgrnd';

const Crackthecluemnscr = () => {
  const navigation = useNavigation();
  const {
    toggleForPlayFlowVibration,
    setToggleForPlayFlowVibration,
    toggleForPlayFlowSound,
    setToggleForPlayFlowSound,
  } = useStore();
  const [forPlayFlowCompletedLevels, setForPlayFlowCompletedLevels] = useState(
    [],
  );
  const [forPlayFlowCorrect, setForPlayFlowCorrect] = useState(0);
  const [forPlayFlowWrong, setForPlayFlowWrong] = useState(0);
  const [forPlayFlowShowResetModal, setForPlayFlowShowResetModal] =
    useState(false);
  const [forPlayFlowShowExitModal, setForPlayFlowShowExitModal] =
    useState(false);
  const [forPlayFlowShowRulesModal, setForPlayFlowShowRulesModal] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      forPlayFlowLoadStats();
    }, []),
  );

  const forPlayFlowLoadStats = async () => {
    const c = parseInt(
      (await AsyncStorage.getItem('forplayflow_correct')) || '0',
    );
    const w = parseInt(
      (await AsyncStorage.getItem('forplayflow_wrong')) || '0',
    );
    setForPlayFlowCorrect(c);
    setForPlayFlowWrong(w);
  };

  const forPlayFlowResetStats = async () => {
    await AsyncStorage.multiRemove([
      'forplayflow_correct',
      'forplayflow_wrong',
    ]);
    setForPlayFlowCorrect(0);
    setForPlayFlowWrong(0);
    setForPlayFlowShowResetModal(false);
  };

  const forPlayFlowSuccess =
    forPlayFlowCorrect + forPlayFlowWrong > 0
      ? Math.round(
          (forPlayFlowCorrect / (forPlayFlowCorrect + forPlayFlowWrong)) * 100,
        )
      : 0;

  useFocusEffect(
    useCallback(() => {
      forPlayFlowLoadMusic();
      forPlayFlowLoadVibration();
      forPlayFlowLoadProgress();
    }, []),
  );

  const forPlayFlowLoadProgress = async () => {
    try {
      const data = await AsyncStorage.getItem('forplayflow_completed_levels');
      if (data) setForPlayFlowCompletedLevels(JSON.parse(data));
    } catch (e) {
      console.log('Error', e);
    }
  };

  const forPlayFlowLoadMusic = async () => {
    try {
      const musicValue = await AsyncStorage.getItem('for_play_flow_sound');
      const isOn = JSON.parse(musicValue);
      setToggleForPlayFlowSound(isOn);
    } catch (error) {}
  };

  const forPlayFlowLoadVibration = async () => {
    try {
      const vibrValue = await AsyncStorage.getItem('for_play_flow_vibration');
      if (vibrValue !== null)
        setToggleForPlayFlowVibration(JSON.parse(vibrValue));
    } catch (error) {}
  };

  const forPlayFlowToggleVibration = async value => {
    try {
      await AsyncStorage.setItem(
        'for_play_flow_vibration',
        JSON.stringify(value),
      );
      setToggleForPlayFlowVibration(value);
    } catch (error) {}
  };

  const forPlayFlowToggleMusic = async value => {
    try {
      await AsyncStorage.setItem('for_play_flow_sound', JSON.stringify(value));
      setToggleForPlayFlowSound(value);
    } catch (error) {}
  };

  const forPlayFlowLevels = [
    { id: 1, title: 'Level 1' },
    { id: 2, title: 'Level 2' },
    { id: 3, title: 'Level 3' },
    { id: 4, title: 'Level 4' },
  ];

  const forPlayFlowIsUnlocked = id =>
    id === 1 || forPlayFlowCompletedLevels.includes(id - 1);

  const forPlayFlowHandleLevelPress = id => {
    if (!forPlayFlowIsUnlocked(id)) return;
    navigation.navigate('Crackthecluegmpl', { level: id });
  };

  return (
    <Crackthecluebckgrnd>
      <View style={styles.forPlayFlowContainer}>
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

        <View style={styles.forPlayFlowLevelsContainer}>
          {forPlayFlowLevels.map(level => {
            const unlocked = forPlayFlowIsUnlocked(level.id);
            return (
              <TouchableOpacity
                key={level.id}
                activeOpacity={unlocked ? 0.8 : 1}
                onPress={() => forPlayFlowHandleLevelPress(level.id)}
                style={styles.forPlayFlowLevelBtn}
              >
                <ImageBackground
                  source={require('../../assets/images/forplayflowhomebtn.png')}
                  style={styles.forPlayFlowLevelBtnBg}
                >
                  {!unlocked && (
                    <Image
                      source={require('../../assets/images/forplayflowlock.png')}
                      style={styles.forPlayFlowLockIcon}
                    />
                  )}
                  <Text
                    style={[
                      styles.forPlayFlowLevelText,
                      !unlocked && { opacity: 0.5 },
                    ]}
                  >
                    {level.title}
                  </Text>
                  {!unlocked && (
                    <Image
                      source={require('../../assets/images/forplayflowlock.png')}
                      style={styles.forPlayFlowLockIcon}
                    />
                  )}
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.forPlayFlowNavContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setForPlayFlowShowRulesModal(true)}
          >
            <ImageBackground
              source={require('../../assets/images/forplayflowhomebtn.png')}
              style={styles.forPlayFlowNavBtn}
            >
              <Text style={styles.forPlayFlowNavText}>Rules</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setForPlayFlowShowResetModal(true)}
          >
            <ImageBackground
              source={require('../../assets/images/forplayflowhomebtn.png')}
              style={styles.forPlayFlowNavBtn}
            >
              <Text style={styles.forPlayFlowNavText}>Stats</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.forPlayFlowBottomBtns}>
          {Platform.OS === 'ios' && (
            <>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => forPlayFlowToggleMusic(!toggleForPlayFlowSound)}
              >
                <Image
                  source={
                    toggleForPlayFlowSound
                      ? require('../../assets/images/forplayflowmuson.png')
                      : require('../../assets/images/forplayflowmusoff.png')
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  Linking.openURL(
                    'https://apps.apple.com/us/app/for-play-flow-crack-the-clue/id6755185619',
                  )
                }
              >
                <Image
                  source={require('../../assets/images/forplayflowshr.png')}
                />
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              forPlayFlowToggleVibration(!toggleForPlayFlowVibration)
            }
          >
            <Image
              source={
                toggleForPlayFlowVibration
                  ? require('../../assets/images/forplayflowvibron.png')
                  : require('../../assets/images/forplayflowvibroff.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {forPlayFlowShowResetModal && (
        <View style={styles.forPlayFlowStatsOverlay}>
          <ImageBackground
            source={require('../../assets/images/forplayflores.png')}
            style={styles.forPlayFlowModalBoard}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.forPlayFlowCloseBtn}
              onPress={() => setForPlayFlowShowResetModal(false)}
            >
              <Image
                source={require('../../assets/images/forplayfloclose.png')}
              />
            </TouchableOpacity>

            <Text style={styles.forPlayFlowModalTitle}>Game Statistics</Text>
            <Text style={styles.forPlayFlowModalText}>Correct Answers:</Text>
            <Text style={styles.forPlayFlowModalQuant}>
              {forPlayFlowCorrect}
            </Text>
            <Text style={styles.forPlayFlowModalText}>Wrong Answers:</Text>
            <Text style={styles.forPlayFlowModalQuant}>{forPlayFlowWrong}</Text>
            <Text style={styles.forPlayFlowModalText}>Success Score:</Text>
            <Text style={styles.forPlayFlowModalQuant}>
              {forPlayFlowSuccess} %
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setForPlayFlowShowExitModal(true)}
            >
              <ImageBackground
                source={require('../../assets/images/forplayflowwelcbtn.png')}
                style={styles.forPlayFlowBtn}
              >
                <Text style={styles.forPlayFlowBtnText}>Reset Stats</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}

      {forPlayFlowShowRulesModal && (
        <View style={styles.forPlayFlowStatsOverlay}>
          <ImageBackground
            source={require('../../assets/images/forplayflores.png')}
            style={styles.forPlayFlowModalBoard}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.forPlayFlowCloseBtn}
              onPress={() => setForPlayFlowShowRulesModal(false)}
            >
              <Image
                source={require('../../assets/images/forplayfloclose.png')}
              />
            </TouchableOpacity>
            <Text style={styles.forPlayFlowModalTitle}>Game Rules</Text>
            <Text style={styles.forPlayFlowModalText}>
              Welcome to For Play Flow – Crack the Clue! Your goal is to find
              which egg hides the chick. Each round gives you one short clue.
              Read it carefully and tap the egg you think is correct. If you’re
              right, the chick appears and you move to the next puzzle. If not,
              you’ll see something else — and need to start that level again.
              There are 4 stages, each with 5 puzzles. Each new stage adds more
              funny farm characters and trickier clues. Finish all 5 puzzles to
              unlock the next stage. Stay sharp, read between the lines, and
              trust your logic — not luck!
            </Text>
          </ImageBackground>
        </View>
      )}

      <Modal
        transparent
        animationType="fade"
        visible={forPlayFlowShowExitModal}
        statusBarTranslucent={Platform.OS === 'android'}
      >
        <BlurView
          style={styles.forPlayFlowModalBlur}
          blurType="light"
          blurAmount={1}
        />
        <View style={styles.forPlayFlowModalOverlay}>
          <ImageBackground
            source={require('../../assets/images/forplayflowmodal.png')}
            style={styles.forPlayFlowExitModal}
          >
            <Text style={styles.forPlayFlowExitText}>
              Are you sure you want to reset your stats? All progress will be
              lost.
            </Text>
          </ImageBackground>
          <View style={styles.forPlayFlowModalButtons}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setForPlayFlowShowExitModal(false);
                forPlayFlowResetStats();
              }}
            >
              <Image
                source={require('../../assets/images/forplayflowconf.png')}
                style={styles.forPlayFlowModalIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setForPlayFlowShowExitModal(false)}
            >
              <Image
                source={require('../../assets/images/forplayflowexit.png')}
                style={styles.forPlayFlowModalIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Crackthecluebckgrnd>
  );
};

const styles = StyleSheet.create({
  forPlayFlowContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  forPlayFlowModalBoard: {
    width: 388,
    height: 528,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
  },
  forPlayFlowBtn: {
    width: 150,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forPlayFlowStatsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    paddingBottom: 80,
    alignItems: 'center',
  },
  forPlayFlowModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    marginTop: 5,
  },
  forPlayFlowModalBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  forPlayFlowModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.51)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forPlayFlowExitModal: {
    width: 332,
    minHeight: 121,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  forPlayFlowExitText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  forPlayFlowBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  forPlayFlowModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 17,
  },
  forPlayFlowModalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 3,
    textAlign: 'center',
    paddingHorizontal: 14,
    lineHeight: 22,
  },
  forPlayFlowModalQuant: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  forPlayFlowBoard: {
    width: 366,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forPlayFlowImage: { top: -10 },
  forPlayFlowLevelsContainer: {
    marginTop: 30,
    gap: 10,
    width: '100%',
    alignItems: 'center',
  },
  forPlayFlowLevelBtn: { width: 206, height: 75 },
  forPlayFlowLevelBtnBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  forPlayFlowLevelText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  forPlayFlowLockIcon: {},
  forPlayFlowBottomBtns: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 43,
    gap: 26,
  },
  forPlayFlowNavBtn: {
    width: 160,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forPlayFlowNavText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  forPlayFlowNavContainer: { alignItems: 'center', marginTop: 10, gap: 10 },
  forPlayFlowCloseBtn: { position: 'absolute', top: -20, right: 0 },
});

export default Crackthecluemnscr;
