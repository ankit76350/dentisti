import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctors',
          tabBarIcon: ({ color }) => <FontAwesome6 name="user-doctor" size={24} color={color} />,
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="receptionists"
        options={{
          title: 'Receptionists',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false, 
        }}
      />
    </Tabs>
  );
}
