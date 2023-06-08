import { StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import Button from "../../components/Button";
import { useCallback, useEffect, useState } from "react";
import Back from "../../components/Back";
import { theme } from "../../styles/theme";
import { listarTodosPorUsuario } from "../../api/endereco";
import alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";
import ImagePerfil from "../../components/ImagePerfil";
import Select from "../../components/Select";
import { alterar, cadastrar } from "../../api/alimento";

const AddEditAlimento = ({ navigation, route }) => {

    const { alimento } = route.params
    const auth = useAuth()

    const [enderecos, setEnderecos] = useState([])
    const [endereco, setEndereco] = useState('')
    const [descricao, setDescricao] = useState(alimento?.descricao || '')
    const [quantidade, setQuantidade] = useState(alimento?.quantidade || '')
    const [dataValidade, setDataValidade] = useState(alimento?.dataValidade || '')
    const [valor, setValor] = useState((alimento?.valor + '').replace('.', ',') || '')
    const [foto, setFoto] = useState(alimento?.foto || '')


    const fetchEnderecos = useCallback(async () => {

        const reponse = await listarTodosPorUsuario(auth.token)

        if (reponse.ok) {
            const json = await reponse.json()
            const enderecosJson = json?._embedded?.entityModelList

            if (enderecosJson) {
                setEnderecos(enderecosJson.map(e => ({
                    value: e.id,
                    text: `${e.logradouro}, ${e.numero} - ${e.cep}`
                })))

                if (alimento?.endereco) {
                    setEndereco(alimento.endereco.id)
                }
                else {
                    setEndereco(enderecosJson[0].id)
                }
            }
            else {
                setEnderecos([])
                setEndereco('')
            }
        }
        else {
            alert('Erro', 'Erro ao buscar endereços')
        }
    })

    const handleCadastrar = async () => {

        if (validarCampos()) {

            const valorFinal = valor ? parseFloat(valor.replace('R$', '').replace('.', '').replace(',', '.')) : 0

            const data = {
                descricao,
                quantidade,
                dataValidade,
                valor: valorFinal == 0 ? null : valorFinal,
                foto,
                ativo: true,
                endereco: { id: endereco }
            }

            const response = await cadastrar(auth.token, data)

            if (response.ok) {
                alert('Sucesso', 'Alimento cadastrado com sucesso')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao cadastrar alimento')
            }
        }
    }

    const handleEditar = async () => {
        if (validarCampos()) {
            const valorFinal = valor ? parseFloat(valor.replace('R$', '').replace('.', '').replace(',', '.')) : 0


            const data = {
                descricao,
                quantidade,
                dataValidade,
                valor: valorFinal == 0 ? null : valorFinal,
                foto,
                ativo: true,
                endereco: { id: endereco }
            }

            const response = await alterar(auth.token, data, alimento.id)

            if (response.ok) {
                alert('Sucesso', 'Alimento alterado com sucesso')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao alterar alimento')
            }
        }
    }

    function validarCampos() {

        if (!foto) {
            alert('Erro', 'Selecione uma foto')
            return false
        }

        if (!descricao) {
            alert('Erro', 'Informe a descrição')
            return false
        }

        else if (descricao.length < 3) {
            alert('Erro', 'Descrição deve ter no mínimo 3 caracteres')
            return false
        }

        if (!quantidade) {
            alert('Erro', 'Informe a quantidade')
            return false
        }

        if (!dataValidade) {
            alert('Erro', 'Informe a data de validade')
            return false
        }

        if (enderecos.length === 0) {
            alert('Erro', 'Cadastre um endereço antes de cadastrar um alimento')
            return false
        }

        if (!endereco) {
            alert('Erro', 'Informe o endereço')
            return false
        }

        return true
    }

    useEffect(() => {
        fetchEnderecos()
    }, [])

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>{alimento === null ? "Cadastro" : "Editar"}</Text>

                <View style={styles.inputs}>
                    <ImagePerfil foto={foto} setFoto={setFoto} />
                    <Input placeholder="Descrição" value={descricao} onChange={setDescricao} />
                    <Input placeholder="Quantidade" value={quantidade} onChange={setQuantidade} keyboard="numeric" />
                    <InputMask mask="money" onChange={setValor} value={valor} />
                    <InputMask mask="date" onChange={setDataValidade} value={dataValidade} />
                    <Select value={endereco} setValue={setEndereco} options={enderecos} />
                    <Button
                        text={alimento === null ? "Cadastrar" : "Alterar"}
                        onPress={alimento === null ? handleCadastrar : handleEditar}
                    />
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    inputs: {
        display: 'flex',
        gap: 30,
        marginBottom: 60,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontFamily: theme.fonts.montserrat.black,
        color: theme.colors.dark,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },
})

export default AddEditAlimento;