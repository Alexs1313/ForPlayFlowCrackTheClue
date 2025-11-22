import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SoundContextProvider } from './ForPlayFlowCrackTheClueSrc/ForPlayFlowCrackTheClueSTR/Crackthecluecntxt';
import Crackthecluestck from './ForPlayFlowCrackTheClueSrc/ForPlayFlowCrackTheClueNV/Crackthecluestck';
import Crackthecluewlcldr from './ForPlayFlowCrackTheClueSrc/ForPlayFlowCrackTheClueCMP/Crackthecluewlcldr';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <SoundContextProvider>
        {isLoading ? <Crackthecluewlcld /> : <Crackthecluestck />}
      </SoundContextProvider>
    </NavigationContainer>
  );
};

export default App;
