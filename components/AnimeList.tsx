import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import styles from "./styles";

type Anime = {
    mal_id: number;
    title?: string | null;
    episodes?: number | null;
    images?: {
        jpg?: {
            image_url?: string | null;
        };
    };
};

type Props = {
    animeList?: Anime[];
};

const AnimeListDisplay: React.FC<Props> = ({ animeList = [] }) => {
    if (!Array.isArray(animeList) || animeList.length === 0) {
        return <Text style={styles.centerText}>No anime found.</Text>;
    }

    const goToDetails = (id: number) => {
        router.push(`/anime/${id}`);
    };

    return (
        <View style={styles.gridContainer}>
            {animeList.map((anime) => (
                <TouchableOpacity
                    key={anime.mal_id}
                    style={styles.animeCard}
                    activeOpacity={0.8}
                    onPress={() => goToDetails(anime.mal_id)}
                >
                    <Image
                        source={{ uri: anime.images?.jpg?.image_url ?? undefined }}
                        style={styles.animeImage}
                    />

                    <Text style={styles.animeTitle} numberOfLines={2}>
                        {anime.title}
                    </Text>

                    <Text style={styles.animeEpisodes}>
                        Episodes : {anime.episodes ?? "N/A"}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default AnimeListDisplay;
