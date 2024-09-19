import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { auth } from './configure';
import { Provider } from 'react-redux';

import Login from './Screens/Login';
import Register from './Screens/Register';
import DashBoard from './Screens/Dashboard';
import Welcome from './Screens/Welcome';
import MapScreen from './Screens/MapView';
import { store } from './store';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // handle user state changes
  function onAuthStateChanged() {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
      <Stack.Screen name='DashBoard' component={DashBoard} options={{ headerShown: false }} />
      <Stack.Screen name='MapScreen' component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

}


export default () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  )
}
