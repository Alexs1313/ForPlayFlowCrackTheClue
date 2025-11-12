import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ForPlayFlowLoader from './ForPlayFlowCrackTheClue/ForPlayFlowComponents/ForPlayFlowLoader';
import ForPlayFlowStack from './ForPlayFlowCrackTheClue/ForPlayFlowNavigation/ForPlayFlowStack';
import { ContextProvider } from './ForPlayFlowCrackTheClue/ForPlayFlowStore/forPlayFlowContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <ContextProvider>
        {isLoading ? <ForPlayFlowLoader /> : <ForPlayFlowStack />}
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
