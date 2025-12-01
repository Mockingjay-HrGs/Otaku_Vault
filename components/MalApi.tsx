import ApiClient from "@/utils/ApiClient";
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import AnimeListDisplay from "./AnimeList";
import MangaListDisplay from "./MangaList";
import styles from './styles';

const MalApi = ({ page }: { page: "topAnime" | "topManga" }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const api = new ApiClient();
            let response;

            if (page === "topAnime") response = await api.fetchTopAnime();
            if (page === "topManga") response = await api.fetchTopManga();

            setData(response?.data ?? []);
            setError(response?.error ?? null);
            setLoading(false);
        };

        load();
    }, [page]);

    if (loading) return <Text style={styles.centerText}>Loading...</Text>;
    if (error) return <Text style={styles.centerText}>Error: {error}</Text>;

    return (
        <ScrollView style={{ padding: 16 }}>
            {page === "topAnime" && <AnimeListDisplay animeList={data} />}
            {page === "topManga" && <MangaListDisplay mangaList={data} />}
        </ScrollView>
    );
};

export default MalApi;
