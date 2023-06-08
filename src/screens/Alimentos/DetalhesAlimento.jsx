import { Image, StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Back from "../../components/Back";
import { theme } from "../../styles/theme";
import { useAuth } from "../../context/AuthContext";
import { buscarPorAlimento } from "../../api/reserva";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";

const DetalhesAlimento = ({ navigation, route }) => {

    const { alimento } = route.params
    const auth = useAuth()
    const [reserva, setReserva] = useState(null)

    const fetchReserva = useCallback(async () => {

        const reponse = await buscarPorAlimento(auth.token, alimento?.id)

        if (reponse.ok) {
            const json = await reponse.json()
            console.log(json)
            setReserva(json)
        }
        else {
            setReserva(null)
        }
    })

    useEffect(() => {
        console.log(alimento)
        fetchReserva()
    }, [])

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>Descrição</Text>
                <View style={styles.container}>
                    <Image source={{ uri: alimento?.foto }} style={styles.imagem} />
                    <Text style={styles.textBold}>Descrição: {alimento?.descricao}</Text>
                    <Text style={styles.text}>Data de Validade: {alimento?.dataValidade}</Text>
                    <Text style={styles.text}>Quantidade: {alimento?.quantidade}</Text>
                    <Text style={styles.text}>Valor: {alimento?.valor ? 'R$' + alimento?.valor.toFixed(2) : 'Doação'}</Text>
                </View>

                <Text style={styles.title}>Endereço de Retirada</Text>
                <View style={styles.container}>
                    <Text style={styles.text}>Logradouro: {alimento?.endereco.logradouro}</Text>
                    <Text style={styles.text}>N°: {alimento?.endereco.numero}</Text>
                    <Text style={styles.text}>Bairro: {alimento?.endereco.bairro}</Text>
                    <Text style={styles.text}>Cidade: {alimento?.endereco.cidade}</Text>
                    <Text style={styles.text}>Estado: {alimento?.endereco.uf}</Text>
                    <Text style={styles.text}>CEP: {alimento?.endereco.cep}</Text>
                    <Text style={styles.text}>Complemento: {alimento?.endereco.complemento}</Text>
                </View>

                <Text style={styles.title}>Reserva</Text>
                <View style={styles.buttons}>
                    {
                        reserva
                        && alimento?.endereco?.usuario?.id === auth.user?.id
                        && <Button onPress={() => { }} text="CONFIRMAR RETIRADA" variation="secondary" />

                    }
                    {
                        !reserva
                        && alimento?.endereco?.usuario?.id === auth.user?.id
                        && <Text style={styles.textBold}>Nenhuma reserva foi feita para este alimento ainda</Text>
                    }
                    {
                        !reserva
                        && alimento?.usuario?.id !== auth.user?.id
                        && <Button onPress={() => { }} text="RESERVAR" variation="secondary" />

                    }
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: theme.fonts.montserrat.black,
        color: theme.colors.dark,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    },

    container: {
        display: 'flex',
        gap: 10,
        marginBottom: 80,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
    },

    buttons: {
        paddingBottom: 80
    },

    imagem: {
        width: 200,
        height: 200,
        borderRadius: 5
    },

    text: {
        fontFamily: theme.fonts.roboto.regular,
        color: theme.colors.dark,
        fontSize: 16,
        textAlign: 'left',
        width: '100%',
    },

    textBold: {
        fontFamily: theme.fonts.poppins.bold,
        color: theme.colors.black,
        fontSize: 20,
        textAlign: 'left',
        width: '100%',
    }
})

export default DetalhesAlimento;