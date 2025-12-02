import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import ApiClient from "@/utils/ApiClient";
import styles from "@/components/styles";

type AnimeResult = {
    mal_id: number;
    title: string;
    type?: string | null;
    episodes?: number | null;
    images?: {
        jpg?: {
            image_url?: string | null;
        };
    };
};

export default function AnimeSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<AnimeResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleSearch = async () => {
        const trimmed = query.trim();
        if (trimmed.length < 2) {
            setTouched(true);
            setResults([]);
            return;
        }

        setLoading(true);
        setTouched(true);

        try {
            const api = new ApiClient();
            const res = await api.searchAnimeByParams(trimmed);
            const list = Array.isArray(res.data) ? res.data : [];
            setResults(list as AnimeResult[]);
        } catch (e) {
            console.error(e);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: AnimeResult }) => {
        const type = item.type ?? "TV";
        const epsText =
            item.episodes != null ? `${item.episodes} eps` : "Nb d'épisodes inconnu";

        return (
            <View style={styles.searchRow}>
                <Image
                    source={{ uri: item.images?.jpg?.image_url ?? undefined }}
                    style={styles.searchPoster}
                />
                <View style={styles.searchRowTextWrapper}>
                    <Text style={styles.searchRowTitle} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text style={styles.searchRowSub}>{`${type} . ${epsText}`}</Text>
                </View>
            </View>
        );
    };

    return (
        <LinearGradient
            colors={["#020024", "#090979", "#040026"]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.searchContainer}>
                <View style={styles.searchHeader}>
                    <TouchableOpacity
                        style={styles.searchBackBtn}
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.searchBackArrow}>←</Text>
                        <Text style={styles.searchBackText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.searchFilterBtn}
                        activeOpacity={0.8}
                        onPress={() => {
                        }}
                    >
                        <Text style={styles.searchFilterIcon}>⛃</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBarWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        placeholderTextColor="#ddddff"
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity
                        style={styles.searchInputIconWrapper}
                        onPress={handleSearch}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.searchIcon}>🔍</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.searchCenter}>
                        <ActivityIndicator color="#fff" />
                    </View>
                ) : results.length === 0 && touched ? (
                    <View style={styles.searchCenter}>
                        <Text style={styles.centerText}>Aucun résultat trouvé…</Text>
                    </View>
                ) : results.length === 0 && !touched ? (
                    <View style={styles.searchCenter}>
                        <Text style={styles.centerText}>
                            Cherche un anime
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={(item) => String(item.mal_id)}
                        renderItem={renderItem}
                        contentContainerStyle={styles.searchListContent}
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}
