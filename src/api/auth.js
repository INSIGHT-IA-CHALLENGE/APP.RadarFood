import * as AuthSession from 'expo-auth-session';
import { Alert } from 'react-native';

export async function handleGoogleSignIn() {
    try {

        const CLIENT_ID = "443211521491-b2l2j7bocjps6bqq9u2vjfei0ic1ag55.apps.googleusercontent.com";
        const REDIRECT_URI = "https://auth.expo.io/@gubalero/lets-go";
        const SCOPE = encodeURI("profile email");
        const RESPONSE_TYPE = "token";
        const PROMPT = encodeURI("select_account")

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}&prompt=${PROMPT}`;
        const { type, params } = await AuthSession.startAsync({ authUrl });
        
        if (type === "success") {
            const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
            const userGoogle = await response.json();
            
            const userContext = {
                id: userGoogle.id,
                email: userGoogle.email,
                name: userGoogle.name,
                icon: userGoogle.picture,
                social: "google"
            }

            return userContext;
        }
        return null;
    } catch (error) {
        Alert.alert("Erro", "Não foi possível autenticar com a conta Google")
        return null;
    }
}