import { createStackNavigator } from '@react-navigation/stack';
import Crackthecluegmpl from '../ForPlayFlowCrackTheClueSCR/Crackthecluegmpl';
import Crackthecluemnscr from '../ForPlayFlowCrackTheClueSCR/Crackthecluemnscr';
import Crackthecluewlcm from '../ForPlayFlowCrackTheClueSCR/Crackthecluewlcm';

const Stack = createStackNavigator();

const Crackthecluestck = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Crackthecluewlcm" component={Crackthecluewlcm} />
      <Stack.Screen name="Crackthecluemnscr" component={Crackthecluemnscr} />
      <Stack.Screen name="Crackthecluegmpl" component={Crackthecluegmpl} />
    </Stack.Navigator>
  );
};

export default Crackthecluestck;
