import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../Screens/Home/Home"
import Profile from "../Screens/Profile/Profile"
import Posteo from "../Screens/Posteo/Posteo"
import Comentario from "../Screens/Comentario/Comentario"
import { FontAwesome } from "@expo/vector-icons"
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Comments" component={Comentario} />
        </Stack.Navigator>
    )
}

export default function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeStack}
                options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}
            />
            <Tab.Screen name="Posteo" component={Posteo}
                options={{ tabBarIcon: () => <Entypo name="squared-plus" size={24} color="black" /> }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }}
            />
        </Tab.Navigator>
    )
}