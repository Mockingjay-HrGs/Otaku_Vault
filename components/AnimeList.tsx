import { Image, Text, View } from "react-native";


const AnimeListDisplay = ({ animeList }) => {
    return (
        <>
            {animeList.map((anime) => (
                <View
                key={anime.mal_id}
                style={{
                    marginBottom: 24,
                    backgroundColor: "#1f1f1f",
                    borderRadius: 16,
                    padding: 12,
                }}
                >
                <Image
                    source={{ uri: anime.images.jpg.image_url }}
                    style={{ width: "100%", height: 240, borderRadius: 12 }}
                />
    
                <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
                    {anime.title}
                </Text>
    
                <Text style={{ color: "#bbb", fontSize: 14 }}>
                    Score : {anime.score}
                </Text>
                </View>
            ))}
        </>
        )   
}

export default AnimeListDisplay;