import { Pressable, View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { auth } from "../../firebase/config";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [loginError, setLoginError] = useState("");

    const onSubmit = () => {

    auth.signInWithEmailAndPassword(email, password)
        .then((response) => {
            navigation.navigate("HomeMenu");
        })
        .catch((error) => {
            setLoginError("Credenciales incorrectas");
        });
};
    
    return (
        <View style={styles.container}>
            {loginError ? <Text style={{ color: "red" }}>{loginError}</Text> : null}
                    <TextInput style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput style={styles.input}
                        placeholder="Password"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <Pressable onPress={()=> onSubmit()} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <Pressable onPress={()=> navigation.navigate("Register")} style={styles.button}>
                        <Text style={styles.buttonText}>Go to Register</Text>
                    </Pressable>
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 16,
        justifyContent: "center",
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: "#28a745",
        margin: 5,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff"
    },
});