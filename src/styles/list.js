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
    },

    itemContent:{
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

    icons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    delete:{
        fontSize: 20,
        color: theme.colors.danger,
    }
})

export default list;