import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Image, StyleSheet } from 'react-native';

import ForPlayFlowBackground from './Crackthecluebckgrnd';

const Crackthecluewlcldr = () => {
  const welcomeForPlayFlowLoader = `
     <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .spinner {
            width: 56px;
            height: 56px;
            border: 11px #004dff double;
            border-left-style: solid;
            border-radius: 50%;
            animation: spin 0.75s infinite linear;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="spinner"></div>
      </body>
    </html>
  `;

  return (
    <ForPlayFlowBackground>
      <View style={styles.loadercnt}>
        <Image
          source={require('../../assets/images/forplayflowldr.png')}
          style={{ marginBottom: 30 }}
        />
        <Image source={require('../../assets/images/forplayflowldr2.png')} />
      </View>

      <View style={styles.loaderwrap}>
        <WebView
          originWhitelist={['*']}
          source={{ html: welcomeForPlayFlowLoader }}
          style={{ width: 220, height: 100, backgroundColor: 'transparent' }}
          scrollEnabled={false}
        />
      </View>
    </ForPlayFlowBackground>
  );
};

const styles = StyleSheet.create({
  loadercnt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 770,
  },
  loaderwrap: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Crackthecluewlcldr;
