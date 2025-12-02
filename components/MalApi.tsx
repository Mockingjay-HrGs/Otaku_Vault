import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";

import ApiClient from "@/utils/ApiClient";
import AnimeListDisplay from "./AnimeList";
import styles from "./styles";
import type { HomeTab } from "@/app/index";

type Anime = {
    mal_id: number;
    title?: string | null;
    score?: number | null;
    images?: {
        jpg?: {
            image_url?: string | null;
        };
    };
};

type MalApiProps = {
    page: HomeTab;
};

const MalApi: React.FC<MalApiProps> = ({ page }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Anime[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const api = new ApiClient();

                let response;
                if (page === "topAiring") {
                    response = await api.fetchTopAiringAnime();
                } else {
                    response = await api.fetchUpcomingAnime();
                }

                const list = Array.isArray(response?.data) ? response.data : [];
                setData(list);
                setError(response?.error ?? null);
            } catch (e: any) {
                console.error(e);
                setError(e?.message ?? "Unexpected error");
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [page]);

    if (loading) {
        return <Text style={styles.centerText}>Loading...</Text>;
    }

    if (error) {
        return (
            <View style={{ padding: 16 }}>
                <Text style={styles.centerText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={{ paddingHorizontal: 16 }}
            contentContainerStyle={{ paddingVertical: 16 }}
        >
            <AnimeListDisplay animeList={data} />
        </ScrollView>
    );
};

export default MalApi;
