import env from '../../env.json'

export async function listar(user, pesquisa, page){

    const {token, prefix} = user

    const response = await fetch(`${env.BASE_URL}/endereco?page=${page}&pesquisa=${pesquisa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response

}