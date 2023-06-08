import { Image, StyleSheet, Text, View } from "react-native";
import { deletar, listar } from "../../api/alimento";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import list from "../../styles/list";
import Container from "../../components/Container";
import Content from "../../components/Content";
import AddButton from "../../components/AddButton";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import alert from "../../components/Alert";
import { AntDesign } from '@expo/vector-icons';


const Alimentos = () => {

    const auth = useAuth()
    const navigation = useNavigation()
    const [erro, setErro] = useState(false)
    const [atualizar, setAtualizar] = useState(false)
    const [pesquisa, setPesquisa] = useState('')
    const [alimentos, setAlimentos] = useState(null)
    const [page, setPage] = useState({ number: 0, totalPages: 0 })

    const fetchAlimentos = useCallback(async () => {

        const reponse = await listar(auth.token, pesquisa, page.number)

        if (reponse.ok) {
            const json = await reponse.json()
            setAlimentos(json?._embedded?.entityModelList ?? [])
            setPage(json?.page)
        }
        else {
            setErro(true)
        }
    })

    const handlePesquisa = (pesquisa) => {
        setPage({ number: 0, totalPages: 0 })
        setPesquisa(pesquisa)
        setAlimentos(null)
        setAtualizar(!atualizar)
    }

    const handleAnterior = () => {
        setPage({ ...page, number: page.number - 1 })
        setAlimentos(null)
        setAtualizar(!atualizar)
    }

    const handleProximo = () => {
        setPage({ ...page, number: page.number + 1 })
        setAlimentos(null)
        setAtualizar(!atualizar)
    }

    const handleDelete = async (id) => {

        const reponse = await deletar(auth.token, id)

        if (reponse.ok) {
            alert('Sucesso', 'Alimento excluído com sucesso')
            setAlimentos(null)
            setAtualizar(!atualizar)
        }
        else {
            alert('Erro', 'Erro ao excluir alimento')
        }
    }

    useEffect(() => {
        fetchAlimentos()
    }, [atualizar])

    return (
        <Container>
            <Content>
                <View style={styles.header}>
                    <Input
                        placeholder='Pesquisar'
                        style={{ maxWidth: auth.user.tipoUsuario === 'F' ? '80%' : '100%' }}
                        value={pesquisa}
                        onChange={e => handlePesquisa(e)} />

                    {
                        auth.user.tipoUsuario === 'F' &&
                        <AddButton onPress={() => navigation.navigate('AddEditAlimento', { alimento: null })} />
                    }
                </View>

                {
                    alimentos === null ?
                        <Loading isError={erro} /> :
                        <View style={list.container}>
                            {
                                alimentos.map(alimento => (
                                    <View style={list.item} key={alimento?.id} onPres>
                                        <View style={list.itemContent}>
                                            <View>
                                                <Image source={{ uri: alimento?.foto }} style={list.itemImagem} />
                                            </View>

                                            <View>
                                                <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemTitle}>
                                                    {alimento?.descricao}
                                                </Text>
                                                <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemDescription}>
                                                    Quantidade: {alimento?.quantidade}
                                                </Text>
                                                <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemDescription}>
                                                    Validade: {alimento?.dataValidade}
                                                </Text>
                                                <Text numberOfLines={1} ellipsizeMode="middle" style={list.itemBagde}>
                                                    {alimento?.valor ? 'R$' + alimento?.valor.toFixed(2) : 'Doação'}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={list.icons}>
                                            <AntDesign name="eye" style={list.view} onPress={() => navigation.navigate("DetalhesAlimento", { alimento: alimento })} />
                                            {
                                                auth.user.tipoUsuario === 'F' &&
                                                <>
                                                    <Feather name="edit" style={list.edit} onPress={() => navigation.navigate("AddEditAlimento", { alimento: alimento })} />
                                                    <Feather name="trash" style={list.delete} onPress={() => handleDelete(alimento?.id)} />
                                                </>

                                            }
                                        </View>
                                    </View>
                                ))
                            }
                            {
                                alimentos?.length === 0
                                && <Text style={list.empty}>Nenhum alimento encontrado</Text>
                            }
                        </View>
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

export default Alimentos;