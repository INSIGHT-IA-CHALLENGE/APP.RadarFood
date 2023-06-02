import react from "react";
import Container from "../components/Container";
import Content from "../components/Content";
import Input from "../components/Input";
import Button from "../components/Button";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../styles/theme";

export default function Login({ navigation }) {
    return (
        <Container background>
            <Content>
                <View style={styles.head}>
                    <Image source={require('../../assets/images/logo-128.png')} style={styles.logo} />
                    <Text style={styles.title}>Radar Food</Text>
                </View>

                <View style={styles.form}>
                    <Input placeholder="Email" />
                    <Input placeholder="Senha" password />
                    <Button text="Entrar" />
                </View>


                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Cadastrar')}
                >
                    Desejo me cadastrar
                </Text>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({

    head: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    logo: {
        width: 128,
        height: 128,
    },

    title: {
        fontFamily: theme.fonts.montserrat.bold,
        color: theme.colors.dark,
        fontSize: 24,
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginTop: 50,
        marginBottom: 20,
        width: '100%',
    },

    link: {
        textAlign: 'center',
        color: theme.colors.dark,
        fontFamily: 'Roboto-Regular',
        textDecorationLine: 'underline',
        marginTop: 20,
    }
});