import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";

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
                        Score : {anime.score ?? "N/A"}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default AnimeListDisplay;
