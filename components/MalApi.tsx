import ApiClient from "@/utils/ApiClient";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AnimeListDisplay from "./AnimeList";
import MangaListDisplay from "./MangaList";

const MalApi = ({ page }: { page: "topAnime" | "topManga" }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);
    // const [page, setPage] = useState<"topAnime" | "topManga" | "home">();
    
    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const api = new ApiClient();
            let response;

            if (page === "topAnime") response = await api.fetchTopAnime();
            if (page === "topManga") response = await api.fetchTopManga();

            setData(response.data);
            setError(response.error);
            setLoading(false);
        };

        load();
    }, [page]);

    if (loading) return <Text>Chargement...</Text>;
    if (error) return <Text>Error: {error}</Text>;


    return (
        <View style={{ padding: 16 }}>
            {page === "topAnime" && <AnimeListDisplay animeList={data} />}
            {page === "topManga" && <MangaListDisplay mangaList={data} />}
        </View>
    );
};

export default MalApi;
