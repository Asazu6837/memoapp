import { useState } from "react";
import {
    View, StyleSheet, TextInput, Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { shape, string } from "prop-types";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// eslint-disable-next-line import/no-cycle, import/named
import { db } from "../../firebase";

import CircleButton from "../compornents/CircleButton";
import translateErrors from "../utils";

export default function MemoEditScreen(props) {
    const { navigation, route } = props;
    const { id, bodyText } = route.params;
    const [body, setBody] = useState(bodyText);
    const auth = getAuth();
    const handlePress = () => {
        if (!auth.currentUser) {
            return;
        }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, String(id));
        setDoc(ref, {
            bodyText: body,
            updatedAt: new Date(),
        }, { merge: true })
            .then(() => {
                navigation.goBack();
            })
            .catch((error) => {
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
            });
    };

    return (
        // <KeyboardAvoidingView style={styles.container} behavior="height">
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={body}
                    multiline
                    style={styles.input}
                    onChangeText={(text) => {
                        setBody(text);
                    }}
                />
            </View>
            <CircleButton
                name="check"
                onPress={handlePress}
            />
        </KeyboardAwareScrollView>
        // </KeyboardAvoidingView>
    );
}

MemoEditScreen.propTypes = {
    route: shape({
        params: shape({ id: string, bodyText: string }),
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        flex: 1,
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24,
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 27,
    },
});
