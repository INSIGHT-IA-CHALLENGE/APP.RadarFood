import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Back from "../components/Back";
import Button from "../components/Button";
import Container from "../components/Container";
import Content from "../components/Content";
import Input from "../components/Input";
import ImagePerfil from "../components/ImagePerfil";
import Select from "../components/Select";

const Cadastrar = ({navigation}) => {

    const options = [{text: 'Desejo receber alimentos', value: 'R'}, {text: 'Desejo fornecer alimentos', value: 'F'}]
    const [foto, setFoto] = useState('')
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [tipo, setTipo] = useState('')

    const cadastrar = () => {
        console.log(foto)
        console.log(nome)
        console.log(telefone)
        console.log(email)
        console.log(senha)
    }

    return (
        <Container background>
            <Content>
                <Back onPress={() => navigation.goBack()} />

                <Text style={styles.title}>Cadastro</Text>

                <View style={styles.inputs}>
                    <ImagePerfil foto={foto} setFoto={setFoto}/>
                    <Input placeholder='Nome' value={nome} onChange={setNome}/>
                    <Input placeholder='Telefone' value={telefone} onChange={setTelefone} keyboard="numeric"/>
                    <Input placeholder='Email' value={email} onChange={setEmail} keyboard="email-address"/>
                    <Input placeholder='Senha' password value={senha} onChange={setSenha}/>
                    <Select value={tipo} setValue={setTipo} options={options}/>
                    <Button text="Cadastrar" onPress={cadastrar}/>
                </View>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({

    title: {
        fontFamily: 'Montserrat-Black',
        color: '#FFF',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },

    inputs: {
        display: 'flex',
        gap: 30,
        marginBottom: 60,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
});

export default Cadastrar;