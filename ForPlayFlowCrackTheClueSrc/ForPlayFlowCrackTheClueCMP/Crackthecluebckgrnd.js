import { ImageBackground, Platform, ScrollView } from 'react-native';

const Crackthecluebckgrnd = ({ children }) => {
  return (
    <ImageBackground
      source={
        Platform.OS === 'ios'
          ? require('../../assets/images/forplayflowbg.png')
          : require('../../assets/images/andrbg.png')
      }
      style={{ flex: 1 }}
    >
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
