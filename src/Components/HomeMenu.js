import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../Screens/Home/Home"
import Profile from "../Screens/Profile/Profile"
import Posteo from "../Screens/Posteo/Posteo"
import { FontAwesome } from "@expo/vector-icons"
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator()

export default function HomeMenu() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome
                            name="home"
                            size={24}
                            color="black"
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Posteo"
                component={Posteo}
                options={{
                    tabBarIcon: () => (
                        <Entypo
                            name="squared-plus"
                            size={24}
                            color="black"
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome
                            name="user"
                            size={24}
                            color="black"
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}