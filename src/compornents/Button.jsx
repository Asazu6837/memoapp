import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { string, func, shape } from "prop-types";

export default function Button(props) {
    const { label, onPress, style } = props;
    return (
        <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    label: string.isRequired,
    onPress: func,
    style: shape(),
};

Button.defaultProps = {
    onPress: null,
    style: null,
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#467FD3",
        borderRadius: 4, // 角の丸み
        alignSelf: "flex-start", // 左詰め
        marginBottom: 24, // 下のオブジェクトとの間隔
    },

    buttonLabel: {
        fontSize: 16,
        lineHeight: 32,
        paddingHorizontal: 32,
        paddingVertical: 8,
        color: "#fff",
    },
});
