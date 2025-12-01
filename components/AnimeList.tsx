import { Image, Text, View } from "react-native";
import styles from './styles';

const AnimeListDisplay = ({ animeList = [] }: { animeList: any[] }) => {
    if (!Array.isArray(animeList) || animeList.length === 0) {
        return <Text style={styles.centerText}>No anime found.</Text>;
    }

    return (
        <>
            {animeList.map((anime) => (
                <View key={anime.mal_id} style={styles.card}>
                    <Image
                        source={{ uri: anime?.images?.jpg?.image_url ?? undefined }}
                        style={styles.image}
                    />

                    <Text style={styles.title}>{anime?.title ?? 'Untitled'}</Text>

                    <Text style={styles.subtitle}>Score : {anime?.score ?? 'N/A'}</Text>
                </View>
            ))}
        </>
    );
};

export default AnimeListDisplay;