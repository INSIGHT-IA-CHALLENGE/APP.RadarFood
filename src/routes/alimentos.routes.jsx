import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Alimentos from "../screens/Alimentos/Alimentos";
import AddEditAlimento from "../screens/Alimentos/AddEditAlimento";
import DetalhesAlimento from "../screens/Alimentos/DetalhesAlimento";

const AlimentosRoutes = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Alimentos'>
            <Stack.Screen name="Alimentos" component={Alimentos} />
            <Stack.Screen name="AddEditAlimento" component={AddEditAlimento} options={{ title: "Alimento" }} />
            <Stack.Screen name="DetalhesAlimento" component={DetalhesAlimento} options={{ title: "Alimento" }} />
        </Stack.Navigator>
    );
}

export default AlimentosRoutes;