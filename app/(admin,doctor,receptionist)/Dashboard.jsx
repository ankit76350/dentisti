// app/Dashboard.tsx
import { Link, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Dashboard() {
  const { userId, data , role } = useLocalSearchParams();
  return (
    <View>
    <Text>Dashboard</Text>
    <Text>User ID: {userId}</Text>
    <Text>Name: {data}</Text>
    <Text>Role: {role}</Text>
    <Link
        href={{
          pathname: `/(${role})/allPatients`,
          params: { userId: "Docter123", data: "hhiii", role:role },
        }}
        style={{ marginTop: 16, fontSize: 18 }}
      >
        <Text style={{ fontWeight: "bold" }}>Go To all Patient : {role}</Text>
      </Link>
  </View>
  );
}
