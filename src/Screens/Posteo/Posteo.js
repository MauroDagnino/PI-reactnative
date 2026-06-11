import { db, auth } from "../../firebase/config"
import { Text, View, Pressable, FlatList, StyleSheet, TextInput } from "react-native"
import { useState } from "react"

function CrearP(props) {

    const [comentario, setComenatrio] = useState("")

    function Post() {
        console.log('post body', {
            owner: auth.currentUser.email,
            descripcionPost: comentario,
            createdAt: Date.now(),
            likes: []
        })
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
            <Text style={styles.title}>Crear nuevo post</Text>
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
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "#eef0fb"
  },
  inputStyle: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b3b8e8",
    marginBottom: 14,
    fontSize: 15,
    color: "#2d2b6b"
  },
  clickeable: {
    backgroundColor: "#4f46e5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
   title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#2d2b6b"
  },
})