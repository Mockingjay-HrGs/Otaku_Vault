import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import styles from "@/components/styles";
import { WebView } from "react-native-webview";

type AnimeDetails = {
    mal_id: number;
    title: string;
    images?: { jpg?: { image_url?: string } };
    synopsis?: string | null;
    score?: number | null;
    aired?: {
        from?: string | null;
        to?: string | null;
        string?: string;
    };
    trailer?: {
        youtube_id?: string | null;
        url?: string | null;
        embed_url?: string | null;
    };
    episodes?: number | null;
};

type Character = {
    character: {
        mal_id: number;
        name: string;
        images?: { jpg?: { image_url?: string } };
    };
    role?: string;
};

const formatDate = (iso?: string | null) =>
    iso ? new Date(iso).toLocaleDateString() : "—";

export default function AnimeDetailsPage() {
    const params = useLocalSearchParams<{ id?: string }>();
    const id = params?.id;
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<AnimeDetails | null>(null);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [episodes, setEpisodes] = useState<any[]>([]);
    const [video, setVideo] = useState<string>("");

    useEffect(() => {
        if (!id) return;
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                const dRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
                const dJson = await dRes.json();
                if (mounted) setDetails(dJson.data ?? null);

                const cRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`);
                const cJson = await cRes.json();
                if (mounted) setCharacters(Array.isArray(cJson.data) ? cJson.data : []);
                const eRes = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
                const eJson = await eRes.json();
                if (mounted) setEpisodes(Array.isArray(eJson.data) ? eJson.data : []);    
                
                if (dRes.ok && dJson.data.trailer?.embed_url) {
                    setVideo(dJson.data.trailer.embed_url.split("?")[0].split("/")[4]);
                }
            
            } catch (e) {
                console.error(e);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchData();
        return () => {
            mounted = false;
        };
    }, [id]);

    if (!id) {
        return (
            <SafeAreaView style={styles.searchContainer}>
                <View style={styles.searchCenter}>
                    <Text style={styles.centerText}>ID manquant</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.searchContainer}>
                <View style={styles.searchCenter}>
                    <ActivityIndicator color="#fff" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#020024" }}>
            <SafeAreaView style={styles.searchContainer}>
                <View style={styles.searchHeader}>
                    <Text onPress={() => router.back()} style={styles.searchBackText}>← Back</Text>
                </View>

                {details ? (
                    <View style={{ padding: 16 }}>
                        <Image
                            source={{ uri: details.images?.jpg?.image_url ?? undefined }}
                            style={{ width: 150, height: 220, borderRadius: 6, marginBottom: 12 }}
                        />
                        <Text style={styles.searchRowTitle}>{details.title}</Text>
                        <Text style={{ color: "#ddd", marginTop: 8 }}>
                            Score: {details.score ?? "N/A"}
                        </Text>

                        {details.trailer?.embed_url ? (
                            <View style={{ height: 220, marginTop: 12, marginBottom: 8, borderRadius: 8, overflow: "hidden" }}>
                                <WebView
                                    originWhitelist={['*']}
                                    source={{ uri: "https://www.youtube.com/watch?v=" + video }}
                                    referrerpolicy='strict-origin-when-cross-origin'
                                    style={{ flex: 1 }}
                                    
                                />
                            </View>
                        ) : null}




                        <Text style={{ color: "#ddd", marginTop: 8, lineHeight: 20 }}>
                            {details.synopsis ?? "No synopsis available."}
                        </Text>

                        <Text style={{ color: "#ddd", marginTop: 8 }}>
                            Aired:{" "}
                            {details.aired?.from ? formatDate(details.aired.from) : "Unknown"}{" "}
                            —{" "}
                            {details.aired?.to ? formatDate(details.aired.to) : details.aired?.string?.includes("to ?") ? "Ongoing" : "Unknown"}
                        </Text>

                        <View>
                            
                        </View>

                        <Text style={{ color: "#fff", marginTop: 16, fontSize: 16 }}>Characters</Text>
                        <FlatList
                            data={characters}
                            keyExtractor={(item) => String(item.character.mal_id)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={{ width: 100, marginRight: 12, alignItems: "center" }}>
                                    <Image
                                        source={{ uri: item.character.images?.jpg?.image_url ?? undefined }}
                                        style={{ width: 80, height: 120, borderRadius: 6 }}
                                    />
                                    <Text style={{ color: "#ddd", fontSize: 12 }} numberOfLines={2}>
                                        {item.character.name}
                                    </Text>
                                    <Text style={{ color: "#aaa", fontSize: 11 }}>{item.role}</Text>
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <View style={styles.searchCenter}>
                        <Text style={styles.centerText}>Détails non disponibles</Text>
                    </View>
                )}
            </SafeAreaView>
        </ScrollView>
    );
}