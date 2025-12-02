import ApiClient from "@/utils/ApiClient";
import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, Button, StyleSheet } from "react-native";
import AnimeListDisplay from "./AnimeList";
import styles from './styles';

const SearchBar = ({ page }: { page: "Anime" | "Manga" }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        
        setLoading(true);
        setError(null);
        
        const api = new ApiClient();
        let response;

        if (page === "Anime") response = await api.searchAnimeByParams(query);  
        if (page === "Manga") response = await api.searchMangaByParams(query);
        
        setResults(response?.data ?? []);
        setError(response?.error ?? null);
        setLoading(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={searchStyles.searchContainer}>
                <TextInput
                    style={searchStyles.input}
                    placeholder="Search anime..."
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>

            {loading && <Text style={styles.centerText}>Searching...</Text>}
            {error && <Text style={styles.centerText}>Error: {error}</Text>}

            <ScrollView style={{ flex: 1, padding: 16 }}>
                <AnimeListDisplay animeList={results} />
            </ScrollView>
        </View>
    );
};

const searchStyles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
    },
    input: {
        flex: 1,
        backgroundColor: '#16213e',
        color: 'white',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
});

export default SearchBar;