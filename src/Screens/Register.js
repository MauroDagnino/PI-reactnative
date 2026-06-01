import { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"


export default function Register() {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function onSubmit() {
    console.log("Email:", email)
    console.log("Username:", username)
    console.log("Password:", password)
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Formulario de Registro
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Ingresá tu email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Pressable
        style={styles.button}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>
          Registrate
        </Text>
      </Pressable>

      <View>
        <Text>Email: {email}</Text>
        <Text>Username: {username}</Text>
        <Text>Password: {password}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 10,
    marginTop: 20
  },

  title: {
    fontSize: 24,
    marginBottom: 20
  },

  input: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginVertical: 10
  },

  button: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#28a745"
  },

  buttonText: {
    color: "#fff"
  }

})