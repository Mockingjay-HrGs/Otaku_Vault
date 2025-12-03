import ApiClient from "@/utils/ApiClient";
import React, { useState } from "react";
import {
    Text,
    View,
    ScrollView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import AnimeListDisplay from "./AnimeList";
import styles from "./styles";

const SearchBar = ({ page }: { page: "Anime" | "Manga" }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);

    const handleSearch = async () => {
        const trimmed = query.trim();
        if (!trimmed) {
            setResults([]);
            setTouched(true);
            return;
        }

        setLoading(true);
        setError(null);
        setTouched(true);
        Keyboard.dismiss();

        try {
            const api = new ApiClient();
            let response;

            if (page === "Anime") response = await api.searchAnimeByParams(trimmed);
            if (page === "Manga") response = await api.searchMangaByParams(trimmed);

            setResults(Array.isArray(response?.data) ? response.data : []);
            setError(response?.error ?? null);
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? "Unexpected error");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Barre de recherche pill */}
            <View style={searchStyles.searchBarWrapper}>
                <TextInput
                    style={searchStyles.input}
                    placeholder="Search"
                    placeholderTextColor="#ddddff"
                    value={query}
                    onChangeText={setQuery}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity
                    style={searchStyles.searchIconWrapper}
                    onPress={handleSearch}
                    activeOpacity={0.8}
                >
                    <Text style={searchStyles.searchIcon}>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* États : loading, erreur, aucun résultat */}
            {loading ? (
                <View style={styles.searchCenter}>
                    <ActivityIndicator color="#fff" />
                </View>
            ) : error ? (
                <View style={styles.searchCenter}>
                    <Text style={styles.centerText}>Error: {error}</Text>
                </View>
            ) : results.length === 0 && touched ? (
                <View style={styles.searchCenter}>
                    <Text style={styles.centerText}>No result found…</Text>
                </View>
            ) : results.length === 0 && !touched ? (
                <View style={styles.searchCenter}>
                    <Text style={styles.centerText}>
                        Type something to start searching
                    </Text>
                </View>
            ) : (
                <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}>
                    <AnimeListDisplay animeList={results} />
                </ScrollView>
            )}
        </View>
    );
};

const searchStyles = StyleSheet.create({
    searchBarWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 8,
    },
    input: {
        flex: 1,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.7)",
        paddingVertical: 10,
        paddingHorizontal: 16,
        paddingRight: 44, // pour laisser la place à l’icône
        color: "white",
        fontSize: 16,
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    searchIconWrapper: {
        position: "absolute",
        right: 24,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    searchIcon: {
        fontSize: 18,
        color: "white",
    },
});

export default SearchBar;
