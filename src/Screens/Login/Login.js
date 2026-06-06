import { Text, View, Pressable, StyleSheet, TextInput } from "react-native"
import { useState } from "react"
import { auth } from '../../firebase/config'

function Login(props) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)
  const [loginError, setLoginError] = useState("")

  function onSubmit(email, password) {
    if (password.length < 8) {
      setLoginError("La contraseña debe tener al menos 8 caracteres")
      return
    }
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        setLogin(true)
        props.navigation.navigate("HomeMenu")
      })
      .catch(error => {
        console.log(error)
        setLoginError(error.message)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Iniciá sesión para continuar</Text>

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
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      {loginError ? <Text style={styles.error}>{loginError}</Text> : null}

      <Pressable style={styles.button} onPress={() => onSubmit(email, password)}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Register")}>
        <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 28,
    justifyContent: "center",
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

export default Login