import { ImageBackground, ScrollView } from 'react-native';

const ForPlayFlowBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/forplayflowbg.png')}
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

export default ForPlayFlowBackground;
