import React, { useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import MalApi from "@/components/MalApi";
import styles from "@/components/styles";

export type HomeTab = "topAiring" | "upcoming";

export default function Home() {
    const [selected, setSelected] = useState<HomeTab>("topAiring");

    const goToSearch = () => {
        router.push("/anime");
    };

    return (
        <LinearGradient
            colors={["#020024", "#090979", "#040026"]}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.appTitle}>Otaku Vault</Text>

                    <TouchableOpacity
                        style={styles.searchButton}
                        activeOpacity={0.8}
                        onPress={goToSearch}
                    >
                        <Text style={styles.searchIcon}>🔍</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabsRow}>
                    <TouchableOpacity
                        style={[
                            styles.pill,
                            selected === "topAiring" && styles.pillActive,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setSelected("topAiring")}
                    >
                        <Text
                            style={[
                                styles.pillText,
                                selected === "topAiring" && styles.pillTextActive,
                            ]}
                        >
                            Top Airing
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.pill,
                            selected === "upcoming" && styles.pillActive,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setSelected("upcoming")}
                    >
                        <Text
                            style={[
                                styles.pillText,
                                selected === "upcoming" && styles.pillTextActive,
                            ]}
                        >
                            Upcoming
                        </Text>
                    </TouchableOpacity>
                </View>

                <MalApi page={selected} />
            </SafeAreaView>
        </LinearGradient>
    );
}
