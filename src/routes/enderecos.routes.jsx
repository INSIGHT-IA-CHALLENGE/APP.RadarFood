import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEditEndereco from "../screens/Enderecos/AddEditEndereco";
import Enderecos from "../screens/Enderecos/Enderecos";

const EnderecoRoutes = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Enderecos'>
            <Stack.Screen name="Endereços" component={Enderecos} />
            <Stack.Screen name="AddEditEndereco" component={AddEditEndereco} options={{ title: "Endereço" }} />
        </Stack.Navigator>
    );
}

export default EnderecoRoutes;