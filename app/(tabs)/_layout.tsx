import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Getting Started',
          }}
        />
        <Drawer.Screen
          name="explore" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Explore',
            title: 'Explore Page',
          }}
        />

        <Drawer.Screen
          name="socialsharing" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Social Sharing',
            title: 'Social Sharing Page',
          }}
        />

        <Drawer.Screen
          name="socialsharinglib" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Social Sharing Library',
            title: 'Social Sharing Page',
          }}
        />

        <Drawer.Screen
          name="workingwithAsyncStorage"
          options={{
            drawerLabel: 'Async Storage',
            title: 'Working with Async Storage',
          }}
        />
      </Drawer>


    </GestureHandlerRootView>
  );
}