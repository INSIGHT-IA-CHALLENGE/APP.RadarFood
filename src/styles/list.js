import { StyleSheet } from "react-native";
import { theme } from "./theme";

const list = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "100%",
        height: "100%",
        marginVertical: 20,
        gap: 10,
    },
    
    item:{
        backgroundColor: theme.colors.white,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    itemContent:{
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },

    itemImagem:{
        width: 75,
        height: 75,
        borderRadius: 5,
        resizeMode: "cover"
    },

    itemTitle:{
        fontSize: 16,
        fontFamily: theme.fonts.montserrat.bold,
        color: theme.colors.black,
    },

    itemDescription:{
        fontSize: 14,
        fontFamily: theme.fonts.roboto.regular,
        color: theme.colors.gray,
    },

    itemBagde:{
        fontFamily: theme.fonts.roboto.black,
        color: theme.colors.success,
        width: '80%',
        padding: 2,
        borderRadius: 50,
    },

    icons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
    },

    delete:{
        fontSize: 20,
        color: theme.colors.danger,
    },

    edit:{
        fontSize: 20,
        color: theme.colors.warning,
    }
})

export default list;