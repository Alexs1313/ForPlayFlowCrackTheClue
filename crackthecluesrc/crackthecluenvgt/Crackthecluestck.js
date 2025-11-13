import { createStackNavigator } from '@react-navigation/stack';
import Crackthecluegmpl from '../crackthecluescrns/Crackthecluegmpl';
import Crackthecluemnscr from '../crackthecluescrns/Crackthecluemnscr';
import Crackthecluewlcm from '../crackthecluescrns/Crackthecluewlcm';

const Stack = createStackNavigator();

const Crackthecluestck = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Crackthecluewlcm" component={Crackthecluewlcm} />
      <Stack.Screen name="Crackthecluemnsc" component={Crackthecluemnsc} />
      <Stack.Screen name="Crackthecluegmpl" component={Crackthecluegmpl} />
    </Stack.Navigator>
  );
};

export default Crackthecluestck;
