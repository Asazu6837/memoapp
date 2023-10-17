import { useState } from "react";
import {
    View, StyleSheet, Text, TextInput, TouchableOpacity, Alert,
} from "react-native";
import {
    getAuth,
    createUserWithEmailAndPassword,
    // GoogleAuthProvider,
    // signInWithPopup,
} from "firebase/auth";

import Button from "../compornents/Button";
import translateErrors from "../utils";

export default function SignUpScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // email=保持したい値,setEmail=値を更新する関数.("")=emailの初期値
    // 上記だとemailがもう定義されている状態
    const auth = getAuth();

    const handlePress = () => {
        // getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 登録成功時の処理
                const { user } = userCredential;
                console.log("ユーザーが登録されました:", user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MemoList" }],
                });
            })
            .catch((error) => {
                // 登録エラー時の処理
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
                console.log("ユーザーの登録に失敗しました:", error.code, error.message);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email Address"
                    textContentType="emailAddress"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <Button label="Submit" onPress={handlePress} />
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
