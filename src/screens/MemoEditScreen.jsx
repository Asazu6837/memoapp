import { View, StyleSheet, TextInput } from "react-native";

import AppBar from "../compornents/AppBar";
import CircleButton from "../compornents/CircleButton";

export default function MemoEditScreen() {
    return (
        <View style={styles.container}>
            <AppBar />
            <View style={styles.inputContainer}>
                <TextInput value="買い物リスト" multiline style={styles.input} />
            </View>
            <CircleButton name="check" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        paddingHorizontal: 27,
        paddingVertical: 32,
        flex: 1,
    },
    input: {
        flex: 1,
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
    },
});
