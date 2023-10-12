import { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
    collection, onSnapshot, orderBy, query,
} from "firebase/firestore";

import MemoList from "../compornents/MemoList";
import CircleButton from "../compornents/CircleButton";
import LogOutButton from "../compornents/LogOutButton";

// eslint-disable-next-line import/no-cycle, import/named
import { auth, db } from "../../firebase";

export default function MemoListScreen(props) {
    const { navigation } = props;
    useEffect(() => {
        navigation.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <LogOutButton />,
        });
    }, []);

    useEffect(() => {
        if (auth.currentUser === null) { return; }
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
        const q = query(ref, orderBy("updatedAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, doc.data());
                console.log("成功ユーザー : ", auth.currentUser.uid);
            });
        }, (error) => {
            console.log(error);
            Alert.alert("データの読み込みに失敗しました。");
        });
        // eslint-disable-next-line no-undef, consistent-return
        return () => {
            unsubscribe();
            console.log("失敗ユーザー : ", auth.currentUser.uid);
        };
    }, []);
    // useEffect(() => {
    //     if (!auth.currentUser) {
    //         return;
    //     }
    //     const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    //     const q = query(ref, orderBy("updatedAt", "desc"));
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         // const remoteMemos = [];
    //         snapshot.forEach((doc) => {
    //             console.log("memoId :", doc.id, doc.data());
    //         //     const { bodyText, updatedAt } = doc.data();
    //         //     remoteMemos.push({
    //         //         id: doc.id,
    //         //         bodyText,
    //         //         updatedAt: updatedAt.toDate(),
    //         //     });
    //         });
    //         // setMemos(remoteMemos);
    //     });
    //     // クリーンアップ関数を返す
    //     // eslint-disable-next-line consistent-return
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);
    return (
        <View style={styles.container}>
            <MemoList />
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
