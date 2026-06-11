import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect, Activity } from "react";
import { auth, db } from "../../firebase/config";
import firebase from "firebase";

export default function Home({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const user = auth.currentUser;

    useEffect(() => {
        db.collection("posts")
            .orderBy("createdAt", "desc")
            .onSnapshot(docs => {
                    let posts = [];
                    docs.forEach(doc => {
                        posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosts(posts);
                setLoading(false);
            })

        db.collection("user")
        .where("email", "==", user.email)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                setUsername(snapshot.docs[0].data().nombreUsuario);
            }
        });

    }, []);

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
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }
    return (
    <View style={styles.flatlist}>
    <Text style={styles.title}>Página de Inicio</Text>
    <FlatList
        data={posts}
        keyExtractor={item => item.id}
        style={styles.container}
        renderItem={({ item }) => {
            const liked = (item.data.likes || []).includes(user.email);
            return (
                <View style={styles.post}>
                    <Text style={styles.owner}>
                        {username} posteó el {new Date(item.data.createdAt).toLocaleDateString()}
                    </Text>
                    <Text style={styles.description}>{item.data.descripcionPost}</Text>
                    {item.data.imageUrl ? (
                        <Image source={{ uri: item.data.imageUrl }} style={styles.image} />
                    ) : null}
                    <View style={styles.actions}>
                        <Pressable onPress={() => toggleLike(item)} style={styles.likeBtn}>
                            <Text style={styles.likeText}>
                                {liked ? "❤️" : "🤍"} {(item.data.likes || []).length} likes
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate("Comments", { postId: item.id })}
                            style={styles.commentBtn}>
                            <Text style={styles.commentText}>Comentar</Text>
                        </Pressable>
                    </View>
                </View>
            );
        }}
    />
    </View>
); 
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#eef0fb",
    },
    flatlist: {
        width: "100%",
        flex: 1,
        backgroundColor: "#eef0fb"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 12,
    },
    post: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    owner: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: "#222",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    likeBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeText: {
        fontSize: 14,
        color: "#555",
    },
    commentBtn: {
        backgroundColor: "#add8e6",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 8,
    },
    commentText: {
        fontSize: 14,
        color: "#333",
    },
});