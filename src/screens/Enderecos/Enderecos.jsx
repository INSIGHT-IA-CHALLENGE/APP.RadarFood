import { StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import AddButton from "../../components/AddButton";
import Input from "../../components/Input";
import { useCallback, useEffect, useState } from "react";
import list from "../../styles/list";
import { deletar, listar } from "../../api/endereco";
import { useAuth } from "../../context/AuthContext";
import { Feather } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import alert from "../../components/Alert";
import { useNavigation } from "@react-navigation/native";

const Enderecos = () => {

    const auth = useAuth()
    const navigation = useNavigation()
    const [erro, setErro] = useState(false)
    const [atualizar, setAtualizar] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [enderecos, setEnderecos] = useState(null)
    const [page, setPage] = useState({ number: 0, totalPages: 0 })

    const fetchEnderecos = useCallback(async () => {

        const reponse = await listar(auth.token, pesquisa, page.number)

        if (reponse.ok) {
            const json = await reponse.json()
            setEnderecos(json?._embedded?.entityModelList ?? [])
            setPage(json?.page)
        }
        else {
            setErro(true)
        }
    })

    const handlePesquisa = (pesquisa) => {
        setPage({ number: 0, totalPages: 0 })
        setPesquisa(pesquisa)
        setEnderecos(null)
        setAtualizar(!atualizar)
    }

    const handleAnterior = () => {
        setPage({ ...page, number: page.number - 1 })
        setEnderecos(null)
        setAtualizar(!atualizar)
    }

    const handleProximo = () => {
        setPage({ ...page, number: page.number + 1 })
        setEnderecos(null)
        setAtualizar(!atualizar)
    }

    const handleDelete = async (id) => {
        alert("Remover endereço", "Deseja realmente remover este endereço?", [
            {
                text: "Confirmar",
                style: "default",
                onPress: () => apagarEndereco(id)
            },
            {
                text: "Cancelar",
                onPress: () => { },
                style: "cancel"
            }
        ])
    }

    const apagarEndereco = async (id) => {

        const response = await deletar(auth.token, id)

        if (response.ok) {
            alert('Sucesso', 'Endereço deletado com sucesso!')
            setEnderecos(null)
            setPage({ number: 0, totalPages: 0 })
            setPesquisa('')
            setAtualizar(!atualizar)
        }
        else {
            alert('Erro', 'Erro ao deletar endereço!')
        }
    }

    useEffect(() => {
        fetchEnderecos()
    }, [atualizar])


    return (
        <Container>
            <Content>
                <View style={styles.header}>
                    <Input placeholder='Pesquisar' style={{ maxWidth: '80%' }} value={pesquisa} onChange={e => handlePesquisa(e)} />
                    <AddButton onPress={() => navigation.navigate('AddEditEndereco', { endereco: null })} />
                </View>

                {
                    enderecos === null ?
                        <Loading isError={erro} /> :
                        <View style={list.container}>
                            {
                                enderecos.map(endereco => (
                                    <View style={list.item} key={endereco?.id}>
                                        <View>
                                            <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemTitle}>
                                                {endereco?.logradouro}, {endereco?.numero}
                                            </Text>
                                            <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemDescription}>
                                                {endereco?.bairro}, {endereco?.cep}
                                            </Text>
                                        </View>

                                        <View style={list.icons}>
                                            <Feather name="edit" style={list.edit} onPress={() => navigation.navigate("AddEditEndereco", { endereco: endereco })} />
                                            <Feather name="trash" style={list.delete} onPress={() => handleDelete(endereco?.id)} />
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                }
                {
                    enderecos?.length === 0
                    && <Text style={list.empty}>Nenhum endereço encontrado</Text>
                }

            </Content>

            <Pagination
                number={page.number}
                totalPages={page.totalPages}
                handleAnterior={handleAnterior}
                handleProximo={handleProximo}
            />
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
})

export default Enderecos;