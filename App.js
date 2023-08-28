import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';

import { useEffect } from 'react';
import { Keyboard } from 'react-native';

import { Provider, useDispatch } from 'react-redux';
import { store } from './store/redux/store';
import { setIsKeyboardVisible } from './store/redux/keyboardSlice';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainNavigator from './routes/MainNavigator';
import ErrorScreen from './screens/ErrorScreen';

const Stack = createNativeStackNavigator();

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        dispatch(setIsKeyboardVisible({ value: true }));
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        dispatch(setIsKeyboardVisible({ value: false }));
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainNavigator"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainNavigator" children={() => <MainNavigator />} />
        <Stack.Screen name="ErrorScreen" children={() => <ErrorScreen />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <StatusBar />
          <AppRouter />
        </PaperProvider>
      </Provider>
    </>
  );
}
