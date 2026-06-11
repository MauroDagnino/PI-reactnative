import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Posts({ post, liked, toggleLike, navigation, onDelete }) {
    return (
        <View style={styles.post}>
            <Text style={styles.owner}>
                {post.data.owner} posteó el {new Date(post.data.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.description}>{post.data.descripcionPost}</Text>

            {onDelete ? (
                <Pressable onPress={() => onDelete(post.id)} style={styles.deleteBtn}>
                    <Text style={styles.deleteBtnText}>Eliminar</Text>
                </Pressable>
            ) : null}

            <View style={styles.actions}>
                <Pressable onPress={() => toggleLike(post)} style={styles.likeBtn}>
                    <Text style={styles.likeText}>
                        {liked ? "❤️" : "🤍"} {(post.data.likes || []).length} likes
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("Comments", { postId: post.id })}
                    style={styles.commentBtn}>
                    <Text style={styles.commentText}>Comentar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    botonesderecha: {
        alignItems: "flex-end",
        justifyContent: "space-between",
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
        marginBottom: 5,
        color: "#222",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",

    },
    likeBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeText: {
        fontSize: 14,
        color: "#555",
    },
    deleteBtn: {
    backgroundColor: "#ffb3ba",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginBottom: 8,
},
    commentBtn: {
        backgroundColor: "#add8e6",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },
    BtnText: {
        fontSize: 14,
        color: "#333",
    }
});