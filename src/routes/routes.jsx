import { NavigationContainer } from '@react-navigation/native';
import DeslogadoRoutes from "./deslogado.routes";
import { useAuth } from '../context/AuthContext';
import LogadoRoutes from './logado.routes';

function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {
                user ?
                <LogadoRoutes/> :
                <DeslogadoRoutes/>
            }
        </NavigationContainer>
    )
}

export default Routes;