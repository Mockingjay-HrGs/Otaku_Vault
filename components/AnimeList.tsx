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

    return (
        <View style={styles.gridContainer}>
            {animeList.map((anime) => (
                <TouchableOpacity
                key={anime.mal_id}
                activeOpacity={0.8}
                onPress={() => router.push(`/anime/${anime.mal_id}`)}
            >
                <View key={anime.mal_id} style={styles.card}>
                    <Image
                        source={{
                            uri: anime.images?.jpg?.image_url ?? undefined,
                        }}
                        style={styles.image}
                    />

                    <Text style={styles.title} numberOfLines={2}>
                        {anime.title ?? "Untitled"}
                    </Text>

                    <Text style={styles.subtitle}>
                        Episodes: {anime.episodes ?? "N/A"}
                    </Text>
                </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default AnimeListDisplay;
