// app/anime.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import styles from "@/components/styles";
import SearchBar from "@/components/SearchBar";
import FilterModal, { FilterParams } from "@/components/FilterModal";

export default function AnimeSearch() {
    const [selected, setSelected] = useState<"Anime" | "Manga">("Anime");
    const [filterParams, setFilterParams] = useState<string[]>([]);
    const [filterVisible, setFilterVisible] = useState(false);

    const handleApplyFilters = (filters: FilterParams) => {
        setSelected(filters.pageType);
        setFilterParams(filters.params);
    };

    return (
        <LinearGradient
            colors={["#020024", "#090979", "#040026"]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.searchContainer}>
                <View style={styles.searchHeader}>
                    <TouchableOpacity
                        style={styles.searchBackBtn}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.searchBackArrow}>←</Text>
                        <Text style={styles.searchBackText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.searchFilterBtn}
                        onPress={() => setFilterVisible(true)}
                    >
                        <Text style={styles.searchFilterIcon}>⛃</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabsRow}>
                    <TouchableOpacity
                        style={[
                            styles.pill,
                            selected === "Anime" && styles.pillActive,
                        ]}
                        onPress={() => setSelected("Anime")}
                    >
                        <Text
                            style={[
                                styles.pillText,
                                selected === "Anime" && styles.pillTextActive,
                            ]}
                        >
                            Anime
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.pill,
                            selected === "Manga" && styles.pillActive,
                        ]}
                        onPress={() => setSelected("Manga")}
                    >
                        <Text
                            style={[
                                styles.pillText,
                                selected === "Manga" && styles.pillTextActive,
                            ]}
                        >
                            Manga
                        </Text>
                    </TouchableOpacity>
                </View>

                <SearchBar page={selected} extraParams={filterParams} />
            </SafeAreaView>

            <FilterModal
                visible={filterVisible}
                currentPage={selected}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
                onReset={() => setFilterParams([])}
            />
        </LinearGradient>
    );
}
