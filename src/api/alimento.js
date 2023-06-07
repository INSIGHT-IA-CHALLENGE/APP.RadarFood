import env from '../../env.json'

export async function cadastrar(user, alimento) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/alimento/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(alimento)
    })

    return response
}

export async function listar(user, pesquisa, page) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/alimento?page=${page}&pesquisa=${pesquisa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

export async function alterar(user, alimento, id) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/alimento/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(alimento)
    })

    return response
}

export async function deletar(user, id) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/alimento/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}