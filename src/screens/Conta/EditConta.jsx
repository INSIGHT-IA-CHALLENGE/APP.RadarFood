import { StyleSheet, Text, View } from "react-native";
import Back from "../../components/Back";
import Container from "../../components/Container";
import Content from "../../components/Content";
import InputMask from "../../components/InputMask";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { theme } from "../../styles/theme";
import { useState } from "react";
import ImagePerfil from "../../components/ImagePerfil";
import Select from "../../components/Select";
import { atualizar } from "../../api/usuario";
import alert from "../../components/Alert";

const EditConta = ({ navigation }) => {

    const auth = useAuth()

    const options = [{ text: 'Desejo receber alimentos', value: 'R' }, { text: 'Desejo fornecer alimentos', value: 'F' }]
    const [foto, setFoto] = useState(auth.user.foto || '')
    const [nome, setNome] = useState(auth.user.nome || '')
    const [telefone, setTelefone] = useState(auth.user.telefone || '')
    const [email, setEmail] = useState(auth.user.email || '')
    const [senha, setSenha] = useState('')
    const [tipo, setTipo] = useState(auth.user.tipoUsuario || 'R')


    const handleEditar = async () => {
        
        if (validaCampos()) {
            const data = {
                id: auth.user.id,
                foto,
                nome,
                telefone,
                email,
                senha: senha.length >= 5 ? senha : auth.user.password,
                tipoUsuario: tipo,
                ativo: true
            }
            

            const response = await atualizar(auth.token, data);

            if (response.ok) {
                auth.fetchUsuario()
                alert('Sucesso', 'Cadastro alterado com sucesso')
                navigation.navigate('Conta')
            }
            else if (response.status === 409) {
                alert('Erro', 'Email ou Telefone já cadastrado')
            }
            else {
                alert('Erro', 'Erro ao atualizar o cadastro')
            }
        }
    }

    const validaCampos = () => {
        if (!foto) {
            alert('Erro', 'Selecione uma foto')
            return false
        }

        if (!nome) {
            alert('Erro', 'Digite seu nome')
            return false
        }
        else if (nome.length < 3) {
            alert('Erro', 'O nome deve ter no mínimo 3 caracteres')
            return false
        }

        if (!telefone) {
            alert('Erro', 'Digite seu telefone')
            return false
        }
        else if (telefone.length < 14) {
            alert('Erro', 'Digite um telefone válido')
            return false
        }

        if (!email) {
            alert('Erro', 'Digite seu email')
            return false
        }

        else if ((/\S+@\S+\.\S+/).test(email) === false) {
            alert('Erro', 'Digite um email válido')
            return false
        }

        if (senha.length > 0 && senha.length < 5) {
            alert('Erro', 'A senha deve ter no mínimo 5 caracteres')
            return false
        }

        return true
    }

    return (
        <Container>
            <Content>
                <Back onPress={() => navigation.goBack()} dark />

                <Text style={styles.title}>Editar</Text>

                <View style={styles.inputs}>
                    <ImagePerfil foto={foto} setFoto={setFoto} />
                    <Input placeholder='Nome' value={nome} onChange={setNome} />
                    <InputMask value={telefone} onChange={setTelefone} mask="telefone" />
                    <Input placeholder='Email' value={email} onChange={setEmail} keyboard="email-address" />
                    <Input placeholder='Senha' password value={senha} onChange={setSenha} />
                    <Select value={tipo} setValue={setTipo} options={options} />
                    <Button
                        text="Alterar"
                        onPress={handleEditar}
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

export default EditConta;