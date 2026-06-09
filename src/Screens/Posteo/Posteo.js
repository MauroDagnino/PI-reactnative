import { db, auth } from "../../firebase/config"
import { Text, View, Pressable, FlatList, StyleSheet, TextInput } from "react-native"
import { useState } from "react"

function CrearP(props) {

    const [comentario, setComenatrio] = useState("")

    function Post() {
            db.collection("posts").add({
            owner: auth.currentUser.email,
            descripcionPost: comentario,
            createdAt: Date.now(),
            likes: []
        })
        props.navigation.navigate("Home")
    }

    return (
        <View style={styles.containerForm}>
            <Text>Crear nuevo post</Text>
            <TextInput style={styles.inputStyle}
                keyboardType="default"
                placeholder="Escribe aqui tu comentario..."
                onChangeText={(text) => setComenatrio(text)}
                value={comentario}></TextInput>
            <Pressable style={styles.clickeable} onPress={() => Post()}><Text style={styles.textoBoton}>Publicar post</Text></Pressable>
        </View>
    )
}

export default CrearP

const styles = StyleSheet.create({
    containerForm: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    inputStyle: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10
    },
     clickeable: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745"
    },
    textoBoton: {
        color: "#fff"
    }
})