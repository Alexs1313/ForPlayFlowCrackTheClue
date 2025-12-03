import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Crackthecluebckgrnd from '../CrackTheClueComponents/Crackthecluebckgrnd';
import { useStore } from '../CrackTheClueStore/Crackthecluecntxt';
import { forPlayFlowBackgroundsList } from '../CrackTheClueData/forPlayFlowGameData';

const forPlayFlowScoreKey = 'forplayflow_total_score';
const forPlayFlowBackgroundKey = 'forplayflow_background';
const forPlayFlowBoughtKey = 'forplayflow_bought_backgrounds';

const Cracktheclueswp = () => {
  const navigation = useNavigation();
  const [forPlayFlowTotalScore, setForPlayFlowTotalScore] = useState(0);
  const [forPlayFlowCurrentBg, setForPlayFlowCurrentBg] = useState(1);
  const [forPlayFlowBoughtBackgrounds, setForPlayFlowBoughtBackgrounds] =
    useState([1]);
  const [forPlayFlowConfirmVisible, setForPlayFlowConfirmVisible] =
    useState(false);
  const [forPlayFlowSelectedBg, setForPlayFlowSelectedBg] = useState(null);
  const { updateForPlayFlowBackground } = useStore();

  useEffect(() => {
    forPlayFlowLoadData();
  }, []);

  const forPlayFlowLoadData = async () => {
    const score = await AsyncStorage.getItem(forPlayFlowScoreKey);
    setForPlayFlowTotalScore(score ? parseInt(score) : 0);

    const bg = await AsyncStorage.getItem(forPlayFlowBackgroundKey);
    setForPlayFlowCurrentBg(bg ? parseInt(bg) : 1);

    const bought = await AsyncStorage.getItem(forPlayFlowBoughtKey);
    setForPlayFlowBoughtBackgrounds(bought ? JSON.parse(bought) : [1]);
  };

  const forPlayFlowHandlePressBuy = bg => {
    if (bg.price > forPlayFlowTotalScore) return;
    setForPlayFlowSelectedBg(bg);
    setForPlayFlowConfirmVisible(true);
  };

  const forPlayFlowConfirmBuy = async () => {
    const bg = forPlayFlowSelectedBg;
    if (!bg) return;

    const updated = [...forPlayFlowBoughtBackgrounds];
    if (!updated.includes(bg.id)) updated.push(bg.id);

    await AsyncStorage.setItem(forPlayFlowBoughtKey, JSON.stringify(updated));
    await AsyncStorage.setItem(forPlayFlowBackgroundKey, String(bg.id));
    await AsyncStorage.setItem(
      forPlayFlowScoreKey,
      String(forPlayFlowTotalScore - bg.price),
    );

    setForPlayFlowBoughtBackgrounds(updated);
    setForPlayFlowCurrentBg(bg.id);
    setForPlayFlowTotalScore(prev => prev - bg.price);

    updateForPlayFlowBackground(bg.id);

    setForPlayFlowConfirmVisible(false);
    setForPlayFlowSelectedBg(null);
  };

  const forPlayFlowSwitchBackground = async bg => {
    updateForPlayFlowBackground(bg.id);
    await AsyncStorage.setItem(forPlayFlowBackgroundKey, String(bg.id));
    setForPlayFlowCurrentBg(bg.id);
  };

  return (
    <Crackthecluebckgrnd>
      <View style={styles.forPlayFlowContainer}>
        <View style={styles.forPlayFlowEggRow}>
          <Image
            source={require('../../assets/images/forplayflowegggame.png')}
          />
          <Text style={styles.forPlayFlowEggText}>
            X {forPlayFlowTotalScore}
          </Text>
        </View>

        <ImageBackground
          source={require('../../assets/images/forplayflowgameboard.png')}
          style={styles.forPlayFlowTitleBoard}
        >
          <Text style={styles.forPlayFlowTitle}>Egg Swap Station</Text>
        </ImageBackground>

        <View style={styles.forPlayFlowGrid}>
          {forPlayFlowBackgroundsList.map(bg => {
            const isBought = forPlayFlowBoughtBackgrounds.includes(bg.id);
            const isUsing = forPlayFlowCurrentBg === bg.id;
            const notEnough = bg.price > forPlayFlowTotalScore && !isBought;

            return (
              <ImageBackground
                key={bg.id}
                source={require('../../assets/images/forplayflores.png')}
                style={styles.forPlayFlowFrame}
              >
                <Image source={bg.image} style={styles.forPlayFlowCardImage} />

                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={isUsing || (!isBought && notEnough)}
                  onPress={() => {
                    if (isBought) {
                      forPlayFlowSwitchBackground(bg);
                    } else {
                      forPlayFlowHandlePressBuy(bg);
                    }
                  }}
                  style={[
                    styles.forPlayFlowBtnArea,
                    notEnough && !isBought && !isUsing && { opacity: 0.6 },
                  ]}
                >
                  <ImageBackground
                    source={require('../../assets/images/forplayflowldshopbtn.png')}
                    style={[
                      styles.forPlayFlowBtnFrame,
                      { opacity: isUsing ? 0.6 : 1 },
                    ]}
                  >
                    {isUsing ? (
                      <Text style={styles.forPlayFlowUsingText}>Using</Text>
                    ) : isBought ? (
                      <Text style={styles.forPlayFlowUseText}>Use</Text>
                    ) : (
                      <Text style={styles.forPlayFlowBuyText}>
                        Swap for {bg.price}
                      </Text>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              </ImageBackground>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.forPlayFlowMenuBtn}
          onPress={() => navigation.goBack()}
        >
          <ImageBackground
            source={require('../../assets/images/forplayflowwelcbtn.png')}
            style={styles.forPlayFlowMenuBtnInner}
          >
            <Text style={styles.forPlayFlowMenuText}>Menu</Text>
          </ImageBackground>
        </TouchableOpacity>

        <Modal
          visible={forPlayFlowConfirmVisible}
          transparent
          animationType="fade"
          statusBarTranslucent={Platform.OS === 'android'}
        >
          <View style={styles.forPlayFlowModalOverlay}>
            <ImageBackground
              source={require('../../assets/images/forplayflowmodal.png')}
              style={styles.forPlayFlowConfirmBox}
            >
              <Text style={styles.forPlayFlowConfirmText}>
                Are you sure you want to swap the eggs to get the background?
              </Text>
            </ImageBackground>

            <View style={styles.forPlayFlowConfirmButtons}>
              <TouchableOpacity onPress={forPlayFlowConfirmBuy}>
                <Image
                  source={require('../../assets/images/forplayflowmodalye.png')}
                  style={styles.forPlayFlowConfirmIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setForPlayFlowConfirmVisible(false)}
              >
                <Image
                  source={require('../../assets/images/forplayflowmodalnoo.png')}
                  style={styles.forPlayFlowConfirmIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Crackthecluebckgrnd>
  );
};

const styles = StyleSheet.create({
  forPlayFlowContainer: { flex: 1, alignItems: 'center', paddingBottom: 40 },
  forPlayFlowEggRow: {
    alignSelf: 'flex-end',
    marginTop: 55,
    marginRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  forPlayFlowEggText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  forPlayFlowTitleBoard: {
    marginTop: 20,
    width: 320,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  forPlayFlowTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  forPlayFlowGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  forPlayFlowFrame: {
    width: 150,
    height: 209,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
  },
  forPlayFlowCardImage: { width: 100, height: 150, resizeMode: 'cover' },
  forPlayFlowBtnArea: { width: 115, height: 32 },
  forPlayFlowBtnFrame: {
    width: 115,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  forPlayFlowUsingText: { color: '#fff', fontWeight: '700' },
  forPlayFlowBuyText: { color: '#fff', fontWeight: '700' },
  forPlayFlowUseText: { color: '#fff', fontWeight: '700' },
  forPlayFlowMenuBtn: { marginTop: 30 },
  forPlayFlowMenuBtnInner: {
    width: 160,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forPlayFlowMenuText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  forPlayFlowModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forPlayFlowConfirmBox: {
    width: 330,
    height: 121,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  forPlayFlowConfirmText: {
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 22,
  },
  forPlayFlowConfirmButtons: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 10,
  },
  forPlayFlowConfirmIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default Cracktheclueswp;
