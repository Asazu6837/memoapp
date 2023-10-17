import { useState, useEffect } from "react";
import {
    View, StyleSheet, Text, TextInput, TouchableOpacity, Alert,
} from "react-native";

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../compornents/Button";
import Loading from "../compornents/Loading";
import translateErrors from "../utils";

export default function LogInScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState("");
    // email=保持したい値,setEmail=値を更新する関数.("")=emailの初期値
    // 上記だとemailがもう定義されている状態
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MemoList" }],
                });
            } else {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    const handlePress = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // 登録成功時の処理
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MemoList" }],
                });
            })
            .catch((error) => {
                // ログインエラー時の処理
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
            })
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading} />
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
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
                    <Text style={styles.footerText}>not registered?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "SignUp" }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Sigh up here!</Text>
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
