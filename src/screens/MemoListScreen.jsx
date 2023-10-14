import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
    collection, onSnapshot, orderBy, query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import MemoList from "../compornents/MemoList";
import CircleButton from "../compornents/CircleButton";
import LogOutButton from "../compornents/LogOutButton";

// eslint-disable-next-line import/no-cycle, import/named
import { db } from "../../firebase";

export default function MemoListScreen(props) {
    const { navigation } = props;
    const auth = getAuth();
    const [memos, setMemos] = useState([]);
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
        });
        // eslint-disable-next-line no-undef, consistent-return
        return () => {
            unsubscribe();
        };
    }, []);
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
