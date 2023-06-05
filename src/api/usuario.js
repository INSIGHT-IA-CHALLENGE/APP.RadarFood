import env from '../../env.json'

export async function cadastrar(usuario) {

    const response = await fetch(`${env.BASE_URL}/usuario/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    return response
}

export async function login(usuario) {

    const response = await fetch(`${env.BASE_URL}/usuario/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    return response
}

export async function detalhes(user) {

    const {token, prefix} = user

    const response = await fetch(`${env.BASE_URL}/usuario`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${prefix} ${token}`
        }
    })

    return response
}