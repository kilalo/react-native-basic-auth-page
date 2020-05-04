import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import Auth from './components/auth'
import Store from './store/store';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'cornflowerblue',
    accent: 'yellow',
  },
};

export default function App() {
  let persistor = persistStore(Store)
  return (
    <StoreProvider store={Store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <Auth />
          </View>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});