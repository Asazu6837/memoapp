import { useState } from "react";
import {
    View, StyleSheet, TextInput,
} from "react-native";

import { collection, addDoc } from "firebase/firestore";

// eslint-disable-next-line import/no-cycle, import/named
import { auth, db } from "../../firebase";

import CircleButton from "../compornents/CircleButton";

import KeyboardAvoidingView from "../compornents/KeyboardAvoidingView";

export default function MemoCreateScreen(props) {
    const { navigation } = props;
    const user = auth.currentUser;
    const [bodyText, SetBodyText] = useState(" ");
    const handlePress = () => {
        addDoc(collection(db, `users/${user.uid}/memos`), {
            bodyText,
            updatedAt: new Date(),
        })
            .then((docRef) => {
                console.log("Created!", docRef.id);
                navigation.goBack();
            })
            .catch((error) => {
                console.log("Error!", error);
            });
    };
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={bodyText}
                    multiline
                    style={styles.input}
                    onChangeText={(text) => { SetBodyText(text); }}
                    autoFocus
                />
            </View>
            <CircleButton name="check" onPress={handlePress} />
        </KeyboardAvoidingView>
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
