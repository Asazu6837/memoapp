import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import Button from "../compornents/Button";

export default function SignUpScreen(props) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput style={styles.input} value="Email Address" />
                <TextInput style={styles.input} value="Password" />
                <Button
                    label="Submit"
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "MemoList" }],
                        });
                        // navigation.rest 履歴がどんな状態であれroutesの中身で上書きをする
                        // indexの0番目を表示する
                        // →0番目より前の画面は表示できないので結果的にBackボタンを削除できる
                    }}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registerd?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "LogIn" }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Log In.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },

    inner: {
        paddingHorizontal: 27,
        paddingVertical: 24,
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
        marginBottom: 24,
    },

    input: {
        fontSize: 16,
        height: 48,
        borderColor: "#DDD",
        borderWidth: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
        marginBottom: 16, // 下のオブジェクトとの間隔
    },

    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
    },

    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: "#467FD3",
    },

    footer: {
        flexDirection: "row",
    },
});
