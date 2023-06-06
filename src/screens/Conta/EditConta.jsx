import { StyleSheet, Text, View } from "react-native";
import Back from "../../components/Back";
import Container from "../../components/Container";
import Content from "../../components/Content";
import InputMask from "../../components/InputMask";
import Input from "../../components/Input";
import Button from "../../components/Button";

const EditConta = () => {

    const options = [{text: 'Desejo receber alimentos', value: 'R'}, {text: 'Desejo fornecer alimentos', value: 'F'}]
    const [foto, setFoto] = useState('')
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [tipo, setTipo] = useState(options[0].value)

    const handleCadastrar = async () => {
        if(validaCampos()){
            const usuario = {
                foto,
                nome,
                telefone,
                email,
                senha,
                tipoUsuario: tipo,
                ativo: true
            }

            const response = await cadastrar(usuario);

            if(response.ok){
                alert('Sucesso', 'Cadastro realizado com sucesso')
                navigation.navigate('Login')
            }
            else if(response.status === 409){
                alert('Erro', 'Email ou Telefone já cadastrado')
            }
            else{
                alert('Erro', 'Erro ao realizar o cadastro')
            }
        }
    }
    
    const validaCampos = () => {
        if(!foto){
            alert('Erro', 'Selecione uma foto')
            return false
        }

        if(!nome){
            alert('Erro', 'Digite seu nome')
            return false
        }
        else if (nome.length < 3){
            alert('Erro', 'O nome deve ter no mínimo 3 caracteres')
            return false
        }

        if(!telefone){
            alert('Erro', 'Digite seu telefone')
            return false
        }
        else if(telefone.length < 14){
            alert('Erro', 'Digite um telefone válido')
            return false
        }

        if(!email){
            alert('Erro', 'Digite seu email')
            return false
        }

        else if((/\S+@\S+\.\S+/).test(email) === false){
            alert('Erro', 'Digite um email válido')
            return false
        }

        if(!senha){
            alert('Erro', 'Digite sua senha')
            return false
        }
        else if (senha.length < 5){
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

                <View style={styles.container}>
                <ImagePerfil foto={foto} setFoto={setFoto}/>
                    <Input placeholder='Nome' value={nome} onChange={setNome}/>
                    <InputMask value={telefone} onChange={setTelefone} mask="telefone"/>
                    <Input placeholder='Email' value={email} onChange={setEmail} keyboard="email-address"/>
                    <Input placeholder='Senha' password value={senha} onChange={setSenha}/>
                    <Select value={tipo} setValue={setTipo} options={options}/>
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

export default EditConta;