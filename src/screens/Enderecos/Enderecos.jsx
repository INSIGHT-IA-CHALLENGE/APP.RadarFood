import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import AddButton from "../../components/AddButton";
import Input from "../../components/Input";
import { useCallback, useEffect, useState } from "react";
import list from "../../styles/list";
import { listar } from "../../api/endereco";
import { useAuth } from "../../context/AuthContext";
import { Feather } from "@expo/vector-icons";
import Loading from "../../components/Loading";

const Enderecos = () => {

    const [erro, setErro] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [enderecos, setEnderecos] = useState(null)
    const [page, setPage] = useState({ number: 0, totalPages: 0 })
    const auth = useAuth()

    const fetchEnderecos = useCallback(async () => {

        const reponse = await listar(auth.user, pesquisa, page.number)

        if (reponse.ok) {
            const json = await reponse.json()
            setEnderecos(json?._embedded?.entityModelList ?? [])
            setPage(json?.page)
        }
        else {
            setErro(true)
        }
    })

    useEffect(() => {
        setEnderecos(null)
        setPage({ number: 0, totalPages: 0 })
        fetchEnderecos()
    }, [pesquisa])

    return (
        <Container>
            <Content>
                <View style={styles.header}>
                    <Input placeholder='Pesquisar' style={{ maxWidth: '80%' }} value={pesquisa} onChange={setPesquisa} />
                    <AddButton />
                </View>

                {
                    enderecos === null ?
                        <Loading isError={erro} /> :
                        <View style={list.container}>
                            {
                                enderecos.map(endereco => (
                                    <View style={list.item} key={endereco?.id}>
                                        <View style={list.itemContent}>
                                            <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemTitle}>
                                                {endereco?.logradouro}, {endereco?.numero}
                                            </Text>
                                            <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemDescription}>
                                                {endereco?.bairro}, {endereco?.cep}
                                            </Text>
                                        </View>

                                        <View style={list.icons}>
                                            <Feather name="trash" style={list.delete} />
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                }

            </Content>

            <Pressable style={styles.test}>
                <Text>Endereço 1</Text>
            </Pressable>
        </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        gap: 10,
        marginBottom: 10,
    },

    test: {
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 0,
        left: 0,
    }
})

export default Enderecos;