import {
    View, Text, StyleSheet, ScrollView,
} from "react-native";

import AppBar from "../compornents/AppBar";
import CircleButton from "../compornents/CircleButton";

export default function MemoDetailScreen() {
    return (
        <View style={styles.container}>
            <AppBar />
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle}>買い物リスト</Text>
                <Text style={styles.memoData}>2020年12月24日 10:00</Text>
            </View>
            <ScrollView style={styles.memoBody}>
                <Text style={styles.memoText}>
                    買い物リスト 書体やレイアウトなどを確認するために用います。
                    本文用なので使い方を間違えると不自然に見えることもありますので要注意。
                </Text>
            </ScrollView>
            <CircleButton name="pencil" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        frex: 1,
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
        paddingVertical: 32,
        paddingHorizontal: 27,
    },

    memoText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
