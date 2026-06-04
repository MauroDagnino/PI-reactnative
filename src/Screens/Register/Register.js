import { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet, FlatList, Image} from "react-native"
import { auth, db} from "../../firebase/config"
import Login from "../Login/Login"

export default function Register(props) {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [register, setRegister] = useState(false)
  const [registerError, setRegisterError] = useState("")

  function onSubmit(email, userName, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            db.collection("user").add({
                email: email,
                nombreUsuario: userName,
                createdAt: Date.now()
            })
        
        })
        .then(response=>{
            props.navigation.navigate("Login")
        })
        .catch(error => {
            setRegisterError("Hay un fallo en el registro")
            console.log(error)
        })

        
    }


  return (
    <View style={styles.container}>
        <View style={styles.containerForm}>
          <Text>Formulario Registro</Text>
          <Text style={styles.texto}>Ingrese su Email</Text>
          <TextInput style={styles.inputStyle}
           keyboardType="email-address"
            placeholder="email"
            onChangeText={text => setEmail(text)}
            value={email}></TextInput>
          <Text style={styles.texto}>Ingrese su Username</Text>
          <TextInput style={styles.inputStyle}
           keyboardType="default"
            placeholder="Nombre de usuario"
            onChangeText={text => setUsername(text)}
            value={username}></TextInput>
          <Text style={styles.texto}>Ingrese su Password</Text>
          <TextInput style={styles.inputStyle}
           keyboardType="default"
             placeholder="Password"
             secureTextEntry={true}
             onChangeText={text => setPassword(text)}
             value={password}></TextInput>
          <Pressable style={styles.clickeableForm} onPress={() => onSubmit(email, username, password)}><Text style={styles.textoBoton}>Registrarse</Text></Pressable>
        </View>

        <Text>Ya tenes cuenta?</Text>
        <Pressable style={styles.clickeable} onPress={() => props.navigation.navigate("Login")}><Text style={styles.texto}>Ir al Login</Text></Pressable>


    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff"
    },

    containerForm: {
        paddingHorizontal: 10,
        marginTop: 20
    },

    texto: {
        fontWeight: "bold",
        textAlign: "center"
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

    clickeableForm: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#28a745"
    },

    textoBoton: {
        color: "#fff"
    },

    clickeable: {
        marginTop: 10,
        alignItems: "center",
    }

})