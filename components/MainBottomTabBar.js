import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';

function MainBottomTabBar({ state, descriptors, navigation, tabBarLabels }) {
  const isKeyboardVisible = useSelector(
    (state) => state.keyboard.isKeyboardVisible
  );

  if (!isKeyboardVisible) {
    return (
      <Card
        mode="elevated"
        style={{
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 70,
            elevation: 5,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                key={label}
                style={{
                  flex: 1,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                  {tabBarLabels[label]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>
    );
  } else {
    return <></>;
  }
}

export default MainBottomTabBar;
