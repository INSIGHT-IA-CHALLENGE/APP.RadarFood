import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Button from "../../components/Button";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { theme } from "../../styles/theme";
import { deletar, detalhes } from "../../api/usuario";
import { useAuth } from "../../context/AuthContext";
import alert from "../../components/Alert";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Conta = () => {
    const auth = useAuth()
    const isFocus = useIsFocused()
    const navigation = useNavigation()
    const [erro, setErro] = useState(false)
    const [usuario, setUsuario] = useState({
        id: 0,
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        tipoUsuario: "",
        ativo: true,
        foto: ""
    })

    const fetchUsuario = useCallback(async () => {
        const response = await detalhes(auth.user)
        if (response.ok) {
            const json = await response.json()
            setUsuario(json)
        }
        else {
            setErro(true)
        }
    })

    useEffect(() => {
        fetchUsuario()
    }, [isFocus])

    const handleLogout = () => {
        alert('Deslogar', 'Deseja realmente sair?', [
            {
                text: 'Confirmar',
                onPress: () => auth.logout(),
                style: 'default',
            },
            {
                text: 'Cancelar',
                onPress: () => { },
                style: 'cancel',
            },
        ])
    }

    const handleDelete = (id) => {
        alert('Apagar conta', 'Deseja realmente apagar sua conta?', [
            {
                text: 'Confirmar',
                onPress: () => apagarConta(id),
                style: 'default',
            },
            {
                text: 'Cancelar',
                onPress: () => { },
                style: 'cancel',
            },
        ])
    }

    const apagarConta = async (id) => {
        const response = await deletar(auth.user, id)

        if (response.ok) {
            alert('Sucesso', 'Conta apagada com sucesso')
            auth.logout()
        }
        else {
            alert('Erro', 'Erro ao apagar conta')
        }
    }

    return (

        <Container>
            <Content>
                {
                    usuario.id === 0 ?
                        <Loading isError={erro} /> :
                        <>
                            <View style={styles.head}>
                                <Image source={{ uri: usuario?.foto }} style={styles.icon} />
                                <Text style={styles.name}>{usuario?.nome}</Text>
                                <Text style={styles.contato}>{usuario?.email}</Text>
                                <Text style={styles.contato}>{usuario?.telefone}</Text>
                            </View>

                            <View style={styles.infos}>
                                <View style={styles.infosContent}>

                                    <Text style={styles.infosTitle}>Objetivo</Text>
                                    <Text style={styles.infosItem}>
                                        {
                                            usuario?.tipoUsuario === "R"
                                                ? 'Receber alimentos'
                                                : 'Fornecer alimentos'
                                        }
                                    </Text>
                                </View>
                            </View>
                        </>
                }

                <View style={styles.buttons}>
                    <Button text="Sair" variation="transparent" onPress={handleLogout}>
                        <AntDesign name="logout" size={20} />
                    </Button>

                    <Button
                        text="Editar"
                        variation="transparent"
                        onPress={usuario?.id !== 0
                            ? () => navigation.navigate('AddEditConta', { conta: usuario })
                            : () => { }
                        }
                    >
                        <Feather name="edit" size={20} />
                    </Button>

                    <Button
                        text="Deletar Conta"
                        variation="danger"
                        onPress={usuario?.id !== 0
                            ? () => handleDelete(usuario?.id)
                            : () => { }
                        }
                    >
                        <Feather name="trash" size={20} />
                    </Button>
                </View>
            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({

    head: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },

    icon: {
        height: 150,
        width: 150,
        borderRadius: 300,
        marginBottom: 10,
    },

    name: {
        width: '100%',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: theme.fonts.poppins.bold,
        color: theme.colors.black,
    },

    contato: {
        width: '100%',
        textAlign: 'center',
        color: theme.colors.gray,
        fontFamily: theme.fonts.roboto.regular,
        fontSize: 16,
    },

    infos: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: '100%',
    },

    infosContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '90%',
        padding: 20,
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        backgroundColor: theme.colors.white,
        borderRadius: 10,
    },

    infosTitle: {
        fontSize: 20,
        fontFamily: theme.fonts.poppins.bold,
        color: theme.colors.dark,
    },

    infosItem: {
        fontSize: 16,
        fontFamily: theme.fonts.roboto.regular,
        color: theme.colors.gray,
    },

    buttons: {
        marginTop: 50,
        display: 'flex',
        width: '100%',
        gap: 12,
    }
});

export default Conta;