import { createStackNavigator } from '@react-navigation/stack';
import Crackthecluegmpl from '../CrackTheClueScreens/Crackthecluegmpl';
import Crackthecluemnscr from '../CrackTheClueScreens/Crackthecluemnscr';
import Crackthecluewlcm from '../CrackTheClueScreens/Crackthecluewlcm';
import Cracktheclueswp from '../CrackTheClueScreens/Cracktheclueswp';

const Stack = createStackNavigator();

const Crackthecluestck = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Crackthecluewlcm" component={Crackthecluewlcm} />
      <Stack.Screen name="Crackthecluemnscr" component={Crackthecluemnscr} />
      <Stack.Screen name="Crackthecluegmpl" component={Crackthecluegmpl} />
      <Stack.Screen name="Cracktheclueswp" component={Cracktheclueswp} />
    </Stack.Navigator>
  );
};

export default Crackthecluestck;
