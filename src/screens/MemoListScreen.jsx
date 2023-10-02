import { View, StyleSheet } from "react-native";

import AppBar from "../compornents/AppBar";
import MemoList from "../compornents/MemoList";
import CircleButton from "../compornents/CircleButton";

export default function MemoListScreen() {
    return (
        <View style={styles.container}>
            <AppBar />
            <MemoList />
            <CircleButton name="plus" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
});
