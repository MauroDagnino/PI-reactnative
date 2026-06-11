import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import { db, auth } from '../../firebase/config';

export default function Comentario(props) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const postId = props.route.params.postId;

    function Post() {
        db.collection("coments").add({
            postId: postId,
            owner: auth.currentUser.email,
            descripcion: newComment,
            createdAt: Date.now(),
            likes: []
        })
        comments.push(newComment)
        props.navigation.navigate("Home")
    }

    useEffect(() => {
        console.log(props.route.params.id);
        db.collection("coments").where("postId", "==", postId).onSnapshot(
            docs => {
                let comentarios = []
                docs.forEach(doc => {
                    comentarios.push({
                        id: doc.id,
                        comentariosUsus: doc.data()
                    })
                })
                setComments(comentarios)
            }
        )
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comentarios</Text>
            <FlatList
                data={comments}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 8 }}>
                        <Text style={{ color: "#888", fontSize: 12 }}>{item.comentariosUsus.owner}</Text>
                        <Text>{item.comentariosUsus.descripcion}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Comentario"
                onChangeText={(text) => setNewComment(text)}
                value={newComment}
            />
            <Pressable style={styles.button} onPress={() => Post()}>
                <Text style={styles.buttonText}>Enviar comentario</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 28,
        backgroundColor: "#eef0fb"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 6,
        color: "#2d2b6b"
    },
    subtitle: {
        fontSize: 14,
        textAlign: "center",
        color: "#6b6aaa",
        marginBottom: 24
    },
    input: {
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
    button: {
        backgroundColor: "#4f46e5",
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
        color: "#4f46e5",
        fontWeight: "bold",
        fontSize: 14
    },
    error: {
        color: "#dc2626",
        textAlign: "center",
        marginBottom: 10
    }
})