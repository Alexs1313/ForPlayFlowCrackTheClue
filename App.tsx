import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SoundContextProvider } from './crackthecluesrc/crackthecluestrg/Crackthecluecntxt';
import Crackthecluestck from './crackthecluesrc/crackthecluenvgt/Crackthecluestck';
import Crackthecluewlcldr from './crackthecluesrc/crackthecluecmpnts/Crackthecluewlcldr';

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
        {isLoading ? <Crackthecluewlcldr /> : <Crackthecluestck />}
      </SoundContextProvider>
    </NavigationContainer>
  );
};

export default App;
