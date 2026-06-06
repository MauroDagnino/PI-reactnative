import { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { auth, db } from "../../firebase/config"

export default function Register(props) {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [registerError, setRegisterError] = useState("")

  function onSubmit(email, userName, password) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        db.collection("users").add({
          email: email,
          nombreUsuario: userName,
          createdAt: Date.now()
        })
      })
      .then(response => {
        props.navigation.navigate("Login")
      })
      .catch(error => {
        setRegisterError(error.message)
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Completá tus datos para registrarte</Text>

      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        keyboardType="default"
        placeholder="Nombre de usuario"
        placeholderTextColor="#999"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        keyboardType="default"
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      {registerError ? <Text style={styles.error}>{registerError}</Text> : null}

      <Pressable style={styles.button} onPress={() => onSubmit(email, username, password)}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Login")}>
        <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#1a1a1a"
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 24
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 14,
    fontSize: 15,
    color: "#1a1a1a"
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  link: {
    textAlign: "center",
    color: "#28a745",
    fontWeight: "bold",
    fontSize: 14
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10
  }
})