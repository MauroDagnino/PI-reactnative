import { View, Text, StyleSheet } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pantalla de Inicio</Text>
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
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16,
    }
});