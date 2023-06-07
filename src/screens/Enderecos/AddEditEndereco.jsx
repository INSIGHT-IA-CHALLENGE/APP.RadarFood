import { StyleSheet, Text, View } from "react-native";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Back from "../../components/Back";
import { theme } from "../../styles/theme";
import { alterar, buscaCep, cadastrar } from "../../api/endereco";
import alert from "../../components/Alert";
import { useAuth } from "../../context/AuthContext";

const AddEditEndereco = ({ navigation, route }) => {

    const { endereco } = route.params

    const [cep, setCep] = useState(endereco?.cep || '')
    const [numero, setNumero] = useState(endereco?.numero || '')
    const [logradouro, setLogradouro] = useState(endereco?.logradouro || '')
    const [bairro, setBairro] = useState(endereco?.bairro || '')
    const [cidade, setCidade] = useState(endereco?.cidade || '')
    const [uf, setUf] = useState(endereco?.uf || '')
    const [complemento, setComplemento] = useState(endereco?.complemento || '')
    const auth = useAuth()

    const handleCep = async (cep) => {
        setCep(cep)
        if (cep.length === 9) {
            const response = await buscaCep(cep)

            if (response.ok) {
                const json = await response.json()

                if (json?.cep) {
                    setLogradouro(json.logradouro)
                    setBairro(json.bairro)
                    setCidade(json.localidade)
                    setUf(json.uf)
                }
                else {
                    alert('Erro', 'Cep não encontrado')
                }
            }
            else {
                alert('Erro', 'Erro ao buscar cep')
            }
        }
    }

    const handleCadastrar = async () => {
        if (validarCampos()) {

            const data = {
                cep,
                numero,
                logradouro,
                bairro,
                cidade,
                uf,
                complemento,
                ativo: true
            }

            const response = await cadastrar(auth.user, data)

            if (response.ok) {
                alert('Sucesso', 'Endereço cadastrado com sucesso')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao cadastrar endereço')
            }
        }
    }

    const handleEditar = async () => {
        if (validarCampos()) {
            const data = {
                cep,
                numero,
                logradouro,
                bairro,
                cidade,
                uf,
                complemento,
                ativo: true,
                usuario: {}
            }

            const response = await alterar(auth.user, data, endereco.id)

            if (response.ok) {
                alert('Sucesso', 'Endereço alterado com sucesso')
                navigation.goBack()
            }
            else {
                alert('Erro', 'Erro ao alterar endereço')
            }    
        }
    }

    function validarCampos() {
        if (cep.length !== 9) {
            alert('Erro', 'Cep inválido')
            return false
        }
        else if (numero.length === 0) {
            alert('Erro', 'Número inválido')
            return false
        }
        else if (logradouro.length < 2) {
            alert('Erro', 'Logradouro inválido')
            return false
        }
        else if (bairro.length < 2) {
            alert('Erro', 'Bairro inválido')
            return false
        }
        else if (cidade.length < 2) {
            alert('Erro', 'Cidade inválida')
            return false
        }
        else if (uf.length !== 2) {
            alert('Erro', 'Estado inválido')
            return false
        }

        return true
    }

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>{endereco === null ? "Cadastro" : "Editar"}</Text>

                <View style={styles.container}>
                    <InputMask mask="cep" onChange={handleCep} value={cep} />
                    <Input placeholder="Logradouro" disabled value={logradouro} />
                    <Input placeholder="Bairro" disabled value={bairro} />
                    <Input placeholder="Cidade" disabled value={cidade} />
                    <Input placeholder="Estado" disabled value={uf} />
                    <Input placeholder="Numero" value={numero} onChange={setNumero} />
                    <Input placeholder="Complemento" value={complemento} onChange={setComplemento} />
                    <Button
                        text={endereco === null ? "Cadastrar" : "Alterar"}
                        onPress={endereco === null ? handleCadastrar : handleEditar}
                    />
                </View>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,

    },

    title: {
        fontFamily: theme.fonts.montserrat.black,
        color: theme.colors.dark,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },
})

export default AddEditEndereco;