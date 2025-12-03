import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SoundContextProvider } from './CrackTheClueSrc/CrackTheClueStore/Crackthecluecntxt';
import Crackthecluestck from './CrackTheClueSrc/CrackTheClueNavigation/Crackthecluestck';
import Crackthecluewlcldr from './CrackTheClueSrc/CrackTheClueComponents/Crackthecluewlcldr';

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
