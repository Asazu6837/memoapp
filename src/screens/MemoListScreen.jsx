import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
    collection, onSnapshot, orderBy, query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import MemoList from "../compornents/MemoList";
import CircleButton from "../compornents/CircleButton";
import LogOutButton from "../compornents/LogOutButton";
import Button from "../compornents/Button";
import Loading from "../compornents/Loading";

// eslint-disable-next-line import/no-cycle, import/named
import { db } from "../../firebase";

export default function MemoListScreen(props) {
    const { navigation } = props;
    const auth = getAuth();
    const [memos, setMemos] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <LogOutButton />,
        });
    }, []);

    useEffect(() => {
        if (!auth.currentUser) {
            return;
        }
        setLoading(true);
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
        const q = query(ref, orderBy("updatedAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const userMemos = [];
            snapshot.forEach((doc) => {
                console.log(doc.id, doc.data());
                const data = doc.data();
                userMemos.push({
                    id: doc.id,
                    bodyText: data.bodyText,
                    updatedAt: data.updatedAt.toDate().toLocaleString("ja-JP"),
                    // toDate()Firestoreのデータ値をJavaのデータ型に変換
                });
            });
            setMemos(userMemos);
            setLoading(false);
        });
        // eslint-disable-next-line no-undef, consistent-return
        return () => {
            unsubscribe();
        };
    }, []);

    if (memos.length === 0) {
        return (
            <View style={emptyStyles.container}>
                <Loading isLoading={isLoading} />
                <View style={emptyStyles.inner}>
                    <Text style={emptyStyles.title}>最初のメモを作成してみよう</Text>
                    <Button
                        style={emptyStyles.button}
                        label="作成する"
                        onPress={() => { navigation.navigate("MemoCreate"); }}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MemoList memos={memos} />
            <CircleButton
                name="plus"
                onPress={() => {
                    navigation.navigate("MemoCreate");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
});

const emptyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inner: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        marginBottom: 24,
    },
    button: {
        alignSelf: "center",
    },
});
