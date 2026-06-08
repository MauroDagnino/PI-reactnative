import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../../firebase/config";
import { useEffect, useState } from "react";

export default function Profile({ navigation }) {
    const user = auth.currentUser;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts")
        .where("owner", "==", user.email)
        .orderBy("owner", 'desc')
        .onSnapshot(docs => {
            let myPosts = [];
            docs.forEach(doc => {
                myPosts.push({
                    id: doc.id,
                    data: doc.data()
                });
                setPosts(myPosts);
            });
        })
    }, [])

    return (
        <View style={styles.container}>
            
                <Text style={styles.title}>Mi Perfil</Text>
                <Text style={styles.subtitle}>{user.displayName || user.email}</Text>
                <Text style={styles.subtitle}>{user.email}</Text>
                <Text style={styles.sectionTitle}>Últimos posteos:</Text>
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text style={styles.postOwner}>{item.data.owner}</Text>
                            <Text style={styles.postDescription}>{item.data.description}</Text>
                            <Pressable
                                style={styles.deleteBtn}
                                onPress={() => deletePost(item.id)}>
                                <Text style={styles.deleteBtnText}>Eliminar</Text>
                            </Pressable>
                        </View>
                    )}
                />
            
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
    alignItems: "flex-start"
},
title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
},
sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
  subtitle: {
    fontSize: 14,
    color: "#6b6aaa",
    marginBottom: 16
},
  post: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
},
  postOwner: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
},
  postDescription: {
    fontSize: 14,
    marginBottom: 8
  },
  deleteBtn: {
    backgroundColor: "#ffb3ba",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-end"
  },
  deleteBtnText: {
    fontSize: 13,
    color: "#333"
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
    fontSize: 16
  }
})