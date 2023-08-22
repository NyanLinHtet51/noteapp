import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoParent: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 18,
        marginTop: 18
    },
    logoText: {
        color: "#1F2937",
        fontSize: 24,
        fontWeight: '600',
        marginLeft: 10
    },
    logoTextColor: {
        color: "#B0E9CA",
        fontSize: 24,
        fontWeight: '600',
        marginLeft: 10
    },
    addBtnParent: {
        backgroundColor: '#1F2937',
        borderRadius: 50,
        paddingHorizontal: 11,
        paddingVertical: 9,
        width: 60,
        shadowColor: 'rgba(0, 0, 0, 0.20)',
        elevation: 20,
        position: 'absolute',
        bottom: 34,
        right: 20
    },
    addBtn: {
        fontSize: 39,
        color: '#FFFFFF',
    },
    noteParent: {
        paddingTop: 18,
        marginHorizontal: 10
    },
    textParent: {
        paddingHorizontal: 16,
        paddingVertical: 18,
        marginBottom: 18,
        marginRight: 18,
        width: '47%',
        borderRadius: 16,
        backgroundColor: '#D9E8FC',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#131313',
        marginBottom: 9
    },
    details: {
        fontSize: 12,
        color: '#131313',
        fontWeight: '400'
    }
})

export default styles