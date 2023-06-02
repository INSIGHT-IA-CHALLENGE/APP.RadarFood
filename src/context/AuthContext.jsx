import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    useState,
    createContext,
    useContext,
    useEffect
} from "react";
import { Alert } from "react-native";

export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { }
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const user = await AsyncStorage.getItem('@user');
            if (user)
                setUser(JSON.parse(user));
            else
                setUser(null);
        }

        getUser();
    }, []);

    async function login(user) {
        try {
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            setUser(null);
            Alert.alert('Erro', 'Erro ao efetuar login')
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem('@user');
            setUser(null);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao efetuar logout')
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);