import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export type FilterParams = {
    pageType: "Anime" | "Manga";
    params: string[];
};

type Props = {
    visible: boolean;
    currentPage: "Anime" | "Manga";
    onClose: () => void;
    onApply: (filters: FilterParams) => void;
    onReset?: () => void;
};

const formatMap: Record<string, string> = {
    TV: "type=tv",
    Film: "type=movie",
    ONA: "type=ona",
    OVA: "type=ova",
    Special: "type=special",
    Music: "type=music",
    CM: "type=cm",
    PV: "type=pv",
    "TV Special": "type=tv_special",
};

const statusMap: Record<string, string> = {
    "Finished Airing": "status=complete",
    "Currently Airing": "status=airing",
    "Not yet aired": "status=upcoming",
};

const genreMap: Record<string, number> = {
    Action: 1,
    Adventure: 2,
    "Sci-Fi": 24,
    Supernatural: 37,
    Romance: 22,
    Fantasy: 10,
};

const demoMap: Record<string, number> = {
    Josei: 43,
    Kids: 15,
    Seinen: 42,
    Shoujo: 25,
    Shounen: 27,
};

const Chip = ({
                  label,
                  selected,
                  onPress,
              }: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) => (
    <TouchableOpacity
        style={[filterStyles.chip, selected && filterStyles.chipActive]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text
            style={[filterStyles.chipText, selected && filterStyles.chipTextActive]}
        >
            {label}
        </Text>
    </TouchableOpacity>
);

const FilterModal: React.FC<Props> = ({
                                          visible,
                                          currentPage,
                                          onClose,
                                          onApply,
                                          onReset,
                                      }) => {
    const [pageType, setPageType] = useState<"Anime" | "Manga">(currentPage);
    const [format, setFormat] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [genres, setGenres] = useState<string[]>([]);
    const [demos, setDemos] = useState<string[]>([]);

    const toggleInArray = (
        value: string,
        arr: string[],
        setter: (v: string[]) => void
    ) => {
        if (arr.includes(value)) setter(arr.filter((x) => x !== value));
        else setter([...arr, value]);
    };

    const handleApply = () => {
        const params: string[] = [];

        if (format && formatMap[format]) params.push(formatMap[format]);
        if (status && statusMap[status]) params.push(statusMap[status]);

        if (genres.length) {
            const ids = genres.map((g) => genreMap[g]).filter(Boolean);
            if (ids.length) params.push(`genres=${ids.join(",")}`);
        }

        if (demos.length) {
            const ids = demos.map((d) => demoMap[d]).filter(Boolean);
            if (ids.length) params.push(`genres=${ids.join(",")}`);
        }

        onApply({ pageType, params });
        onClose();
    };

    const handleReset = () => {
        setFormat(null);
        setStatus(null);
        setGenres([]);
        setDemos([]);
        setPageType(currentPage);
        onReset && onReset();
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={filterStyles.backdrop}>
                <LinearGradient
                    colors={["#020024", "#090979", "#040026"]}
                    style={filterStyles.modalContainer}
                >
                    <View style={filterStyles.headerRow}>
                        <Text style={filterStyles.title}>Filtrer par</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={filterStyles.closeText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 24 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={filterStyles.sectionLabel}>Type</Text>
                        <View style={filterStyles.rowChips}>
                            <Chip
                                label="Anime"
                                selected={pageType === "Anime"}
                                onPress={() => setPageType("Anime")}
                            />
                            <Chip
                                label="Manga"
                                selected={pageType === "Manga"}
                                onPress={() => setPageType("Manga")}
                            />
                        </View>

                        <Text style={filterStyles.sectionLabel}>Format</Text>
                        <View style={filterStyles.rowWrap}>
                            {Object.keys(formatMap).map((f) => (
                                <Chip
                                    key={f}
                                    label={f}
                                    selected={format === f}
                                    onPress={() => setFormat(format === f ? null : f)}
                                />
                            ))}
                        </View>

                        <Text style={filterStyles.sectionLabel}>Status</Text>
                        <View style={filterStyles.rowWrap}>
                            {Object.keys(statusMap).map((s) => (
                                <Chip
                                    key={s}
                                    label={s}
                                    selected={status === s}
                                    onPress={() => setStatus(status === s ? null : s)}
                                />
                            ))}
                        </View>

                        <Text style={filterStyles.sectionLabel}>Genre</Text>
                        <View style={filterStyles.rowWrap}>
                            {Object.keys(genreMap).map((g) => (
                                <Chip
                                    key={g}
                                    label={g}
                                    selected={genres.includes(g)}
                                    onPress={() => toggleInArray(g, genres, setGenres)}
                                />
                            ))}
                        </View>

                        <Text style={filterStyles.sectionLabel}>Demographics</Text>
                        <View style={filterStyles.rowWrap}>
                            {Object.keys(demoMap).map((d) => (
                                <Chip
                                    key={d}
                                    label={d}
                                    selected={demos.includes(d)}
                                    onPress={() => toggleInArray(d, demos, setDemos)}
                                />
                            ))}
                        </View>

                        <View style={filterStyles.footer}>
                            <TouchableOpacity
                                style={filterStyles.applyButton}
                                onPress={handleApply}
                                activeOpacity={0.85}
                            >
                                <Text style={filterStyles.applyText}>Appliquer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleReset}>
                                <Text style={filterStyles.resetText}>
                                    Réinitialiser les filtres
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </View>
        </Modal>
    );
};

const filterStyles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.40)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        maxHeight: "90%",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        color: "white",
        fontSize: 26,
        fontWeight: "700",
    },
    closeText: {
        color: "#4da3ff",
        fontSize: 16,
        fontWeight: "500",
    },
    sectionLabel: {
        color: "#d0d4ff",
        fontSize: 14,
        marginBottom: 8,
        marginTop: 12,
    },
    rowChips: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 8,
    },
    rowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.6)",
    },
    chipActive: {
        backgroundColor: "#8257ff",
        borderColor: "#8257ff",
    },
    chipText: {
        color: "white",
        fontSize: 14,
    },
    chipTextActive: {
        fontWeight: "600",
    },
    footer: {
        marginTop: 24,
        alignItems: "center",
    },
    applyButton: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: 999,
        backgroundColor: "#8257ff",
        alignItems: "center",
        marginBottom: 10,
    },
    applyText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    resetText: {
        color: "#4da3ff",
    },
});

export default FilterModal;
