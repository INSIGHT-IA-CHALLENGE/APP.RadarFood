import env from '../../env.json'

export async function cadastrar(user, reserva) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/reserva/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        },
        body: JSON.stringify(reserva)
    })

    return response
}

export async function listar(user, pesquisa, page) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/reserva?page=${page}&pesquisa=${pesquisa}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

export async function deletar(user, id) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/reserva/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}

export async function buscarPorAlimento(user, id) {

    const { token, prefix } = user

    const response = await fetch(`${env.BASE_URL}/reserva/alimento/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}