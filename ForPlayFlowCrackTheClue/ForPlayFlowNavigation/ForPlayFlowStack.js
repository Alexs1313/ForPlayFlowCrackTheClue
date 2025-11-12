import { createStackNavigator } from '@react-navigation/stack';
import ForPlayFlowOnboarding from '../ForPlayFlowScreens/ForPlayFlowOnboarding';
import ForPlayFlowHome from '../ForPlayFlowScreens/ForPlayFlowHome';
import ForPlayFlowGame from '../ForPlayFlowScreens/ForPlayFlowGame';

const Stack = createStackNavigator();

const ForPlayFlowStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ForPlayFlowOnboarding"
        component={ForPlayFlowOnboarding}
      />
      <Stack.Screen name="ForPlayFlowHome" component={ForPlayFlowHome} />
      <Stack.Screen name="ForPlayFlowGame" component={ForPlayFlowGame} />
    </Stack.Navigator>
  );
};

export default ForPlayFlowStack;
