import env from '../../env.json'

export async function buscaCep(cep) {

    const response = await fetch(`${env.CEP_URL}/${cep}/json`, {
        method: "GET"
    })

    return response
}

export async function cadastrar(user, endereco) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/endereco/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(endereco)
    })

    return response
}

export async function listar(user, pesquisa, page) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/endereco?page=${page}&pesquisa=${pesquisa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

export async function alterar(user, endereco, id) {
    
        const { token, prefix } = user
    
        const response = await fetch(`${env.BASE_URL}/endereco/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${prefix} ${token}`
            },
            body: JSON.stringify(endereco)
        })
    
        return response
}

export async function deletar(user, id) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/endereco/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}