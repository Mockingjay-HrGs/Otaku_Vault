import { Image, Text, View } from "react-native";
import styles from './styles';

const MangaListDisplay = ({ mangaList = [] }: { mangaList: any[] }) => {
    if (!Array.isArray(mangaList) || mangaList.length === 0) {
        return <Text style={styles.centerText}>No manga found.</Text>;
    }

    return (
        <>
            {mangaList.map((manga) => (
                <View key={manga.mal_id} style={styles.card}>
                    <Image
                        source={{ uri: manga?.images?.jpg?.image_url ?? undefined }}
                        style={styles.image}
                    />

                    <Text style={styles.title}>{manga?.title ?? 'Untitled'}</Text>

                    <Text style={styles.subtitle}>Score : {manga?.score ?? 'N/A'}</Text>
                </View>
            ))}
        </>
    );
};

export default MangaListDisplay;