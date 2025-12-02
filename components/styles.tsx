// components/styles.tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    /** HOME **/
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
        fontSize: 20,
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
        color: "#CCCCFF",
        fontSize: 16,
        fontWeight: "600",
    },
    pillTextActive: {
        color: "white",
    },

    /** GRID (HOME LIST) **/
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

    /** TEXT ETAT **/
    centerText: {
        textAlign: "center",
        color: "white",
        marginTop: 24,
    },

    // ancien layout de boutons si tu l'utilises encore
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 16,
    },

    /** SEARCH PAGE **/

    searchContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    searchHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    searchBackBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    searchBackArrow: {
        color: "white",
        fontSize: 20,
    },
    searchBackText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    searchFilterBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.6)",
        alignItems: "center",
        justifyContent: "center",
    },
    searchFilterIcon: {
        color: "white",
        fontSize: 18,
    },

    searchBarWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.7)",
        paddingVertical: 10,
        paddingHorizontal: 16,
        paddingRight: 44,
        color: "white",
        fontSize: 16,
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    searchInputIconWrapper: {
        position: "absolute",
        right: 10,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    searchCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    searchListContent: {
        paddingBottom: 24,
    },

    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },
    searchPoster: {
        width: 90,
        height: 120,
        borderRadius: 12,
        marginRight: 14,
        backgroundColor: "#111",
    },
    searchRowTextWrapper: {
        flex: 1,
    },
    searchRowTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },
    searchRowSub: {
        color: "#ddd",
        fontSize: 14,
    },
});

export default styles;
