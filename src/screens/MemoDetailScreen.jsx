import { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, ScrollView,
} from "react-native";
import { shape, string } from "prop-types";
import { getAuth } from "firebase/auth";
import {
    collection, doc, onSnapshot, query,
} from "firebase/firestore";
// eslint-disable-next-line import/no-cycle, import/named
import { db } from "../../firebase";

import CircleButton from "../compornents/CircleButton";

export default function MemoDetailScreen(props) {
    const { navigation, route } = props;
    // route = MemoList内のid受け取り用
    const { id } = route.params;
    const auth = getAuth();
    console.log(id);
    const [memo, setMemos] = useState([]);
    useEffect(() => {
        // ここの記載はMemoListScreenでの記載方法と異なる方法で行っているので注意
        if (!auth.currentUser) {
            return;
        }
        // const ref = collection(db, `users/${auth.currentUser.uid}/memos`, String(id));
        // const q = query(ref);
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, String(id));
        const unsubscribe = onSnapshot(ref, (memoDoc) => {
            // snapshot.forEach((memoDoc) => {
            // });
            const { bodyText, updatedAt } = memoDoc.data();
            setMemos({
                id: memoDoc.id,
                bodyText,
                updatedAt,
            });
        });
        // eslint-disable-next-line no-undef, consistent-return
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>
                    {memo?.bodyText}
                </Text>
                <Text style={styles.memoData}>
                    {memo?.updatedAt?.toDate().toLocaleString("ja-JP")}
                </Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoText}>{memo?.bodyText}</Text>
            </ScrollView>
            <CircleButton
                name="pencil"
                style={{ top: 60, bottom: "auto" }}
                onPress={() => {
                    navigation.navigate("MemoEdit");
                }} // Stack.Screenの箇所で自動的にpropsに格納している
            />
        </View>
    );
}

MemoDetailScreen.propTypes = {
    route: shape({
        params: shape({ id: string }),
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    memoHeader: {
        backgroundColor: "#467FD3",
        height: 96,
        justifyContent: "center",
        paddingVertical: 24,
        paddingHorizontal: 19,
    },

    memoTitle: {
        color: "#fff",
        fontSize: 20,
        lineHeight: 32,
        fontWeight: "bold",
    },

    memoData: {
        color: "#fff",
        fontSize: 12,
        lineHeight: 16,
    },

    memoBody: {
        paddingHorizontal: 27,
    },

    memoText: {
        paddingVertical: 32,
        fontSize: 16,
        lineHeight: 24,
    },
});
