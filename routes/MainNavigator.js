import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateScreen from '../screens/CreateScreen';
import ScanScreenNavigator from './ScanScreenNavigator';

import MainBottomTabBar from '../components/MainBottomTabBar';

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const tabBarLabels = {
    CreateScreen: 'Create',
    ScanScreenNavigator: 'Scan',
  };

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <MainBottomTabBar {...props} tabBarLabels={tabBarLabels} />
      )}
    >
      <Tab.Screen name="CreateScreen" children={() => <CreateScreen />} />
      <Tab.Screen
        name="ScanScreenNavigator"
        children={() => <ScanScreenNavigator />}
      />
    </Tab.Navigator>
  );
}

export default MainNavigator;
