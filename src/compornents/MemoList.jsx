import {
    StyleSheet, Text, View, TouchableOpacity, Alert, FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    arrayOf, instanceOf, shape, string,
} from "prop-types";

import Icon from "./icon";

export default function MemoList(props) {
    const { memos } = props;
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.memoListItem}
            onPress={() => {
                navigation.navigate("MemoDetail", { id: item.id });
            }}
        >
            <View>
                <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
                <Text style={styles.memolistItemData}>{String(item.updatedAt)}</Text>
            </View>
            <TouchableOpacity
                style={styles.memoDelete}
                onPress={() => {
                    Alert.alert("Are you sure?");
                }}
            >
                <Icon name="delete" size={16} color="#B0B0B0" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

MemoList.propTypes = {
    memos: arrayOf(
        shape({
            id: string,
            bodyText: string,
            updatedAt: instanceOf(Date),
            // クラスから派生した値を格納するのに使用？
        }),
    ).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    memoListItem: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.15)",
    },
    memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32,
    },
    memolistItemData: {
        fontSize: 12,
        lineHeight: 16,
        color: "#848484",
    },

    memoDelete: {
        padding: 8,
    },
});
