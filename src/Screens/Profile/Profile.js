import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../../firebase/config";
import { useEffect, useState } from "react";
import firebase from "firebase";
import Posts from "../../Components/Posts";

export default function Profile({ navigation }) {
    const user = auth.currentUser;
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        db.collection("posts")
        .where("owner", "==", user.email)
        .onSnapshot(docs => {
            let myPosts = [];
            docs.forEach(doc => {
                myPosts.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setPosts(myPosts);
        })

        db.collection("user")
        .where("email", "==", user.email)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                setUsername(snapshot.docs[0].data().nombreUsuario);
            }
        });
    
    }, [])

    const toggleLike = (post) => {
        const likes = post.data.likes || [];
        const alreadyLiked = likes.includes(user.email);
    
        db.collection('posts')
            .doc(post.id)
            .update({
                likes: alreadyLiked
                    ? firebase.firestore.FieldValue.arrayRemove(user.email)
                    : firebase.firestore.FieldValue.arrayUnion(user.email)
            })
            .then(() => {
                console.log("Like actualizado");
            })
    }

    const deletePost = (id) => {
        db.collection("posts")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Post eliminado");
            })
            .catch(error => {
                console.error("Error al eliminar el post:", error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{username}</Text>
            <Text style={styles.subtitle}>{user.email}</Text>
            <Text style={styles.sectionTitle}>Últimos posteos:</Text>
            {posts.length === 0 ? ( <Text>No has realizado ningún posteo aún.</Text> ) : (
            <FlatList
            data={posts}
            keyExtractor={item => item.id}
            style={{ width: "100%" }}
            renderItem={({ item }) => {
            const liked = (item.data.likes || []).includes(user.email);
            return (
            <View>
                <Posts
                    post={item}
                    liked={liked}
                    toggleLike={toggleLike}
                    navigation={navigation}
                    onDelete={deletePost}
                />
            </View>
            
            );
            }}
            />
        )}
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
    backgroundColor: "#eef0fb",
    alignItems: "flex-start"
},
title: {
    textTransform: "capitalize",
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
    fontSize: 15,
    color: "#616176ff",
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
    marginTop: 8,
    marginBottom: 10
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
    marginBottom: 13
  },
  buttonText: {
    color: "#e1e1e1ff",
    fontWeight: "bold",
    fontSize: 16
  }
})