// components/styles.tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: "700",
        color: "white",
    },
    searchButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    searchIcon: {
        fontSize: 22,
        color: "white",
    },

    tabsRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 24,
    },
    pill: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.10)",
        alignItems: "center",
        justifyContent: "center",
    },
    pillActive: {
        backgroundColor: "rgba(255,255,255,0.25)",
    },
    pillText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
    pillTextActive: {
        color: "white",
    },

    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: "48%",
        marginBottom: 20,
    },
    image: {
        width: "100%",
        aspectRatio: 3 / 4,
        borderRadius: 18,
        backgroundColor: "#111",
        marginBottom: 8,
    },
    title: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    subtitle: {
        color: "#CCCCCC",
        fontSize: 12,
        marginTop: 2,
    },

    centerText: {
        textAlign: "center",
        color: "white",
        marginTop: 24,
    },

    buttonsRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 16,
    },
});

export default styles;
