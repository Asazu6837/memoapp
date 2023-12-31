import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import MemoListScreen from "./src/screens/MemoListScreen";
import MemoDetailScreen from "./src/screens/MemoDetailScreen";
import MemoEditScreen from "./src/screens/MemoEditScreen";
import MemoCreateScreen from "./src/screens/MemoCreateScreen";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

require("firebase/firestore");

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LogIn"
                // ↑初期画面指定
                screenOptions={{
                    headerStyle: { backgroundColor: "#467FD3" },
                    headerTitleStyle: { color: "#fff" },
                    headerTitle: "Memo App",
                    headerTintColor: "#fff",
                    headerBackTitle: "Back",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    // 画面遷移をIOSと同じ動作(横スライド)になる
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                }}
            >
                <Stack.Screen name="MemoList" component={MemoListScreen} />
                <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
                <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
                <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
                <Stack.Screen
                    name="LogIn"
                    component={LogInScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
