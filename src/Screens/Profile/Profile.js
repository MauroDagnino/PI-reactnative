import { Pressable, View, Text, StyleSheet } from "react-native";
import { auth } from "../../firebase/config";

export default function Profile({ navigation }) {
    const user = auth.currentUser;
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.title}>Mi Perfil</Text>
                <Text style={styles.subtitle}>{user.email}</Text>
            </View>
            <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>
                        Logout. Hacer click aquí te lleva al login.
                    </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
},
center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
},
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
},
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#1a1a2e"
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b6aaa",
    marginBottom: 4
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 15
  },
  buttonText: {
    color: "#e1e1e1ff",
    fontWeight: "bold",
    fontSize: 14
  }
})