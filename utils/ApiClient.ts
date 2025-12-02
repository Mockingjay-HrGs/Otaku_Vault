// utils/ApiClient.ts

export default class ApiClient {
    private readonly baseUrl: string = "https://api.jikan.moe/v4";

    /** Helper pour faire un GET et uniformiser data / error */
    private async get(path: string): Promise<{ data: any[] | null; error: string | null }> {
        try {
            const res = await fetch(`${this.baseUrl}${path}`);
            const json = await res.json();
            return { data: json.data ?? null, error: null };
        } catch (err: any) {
            return { data: null, error: err?.message ?? String(err) };
        }
    }

    // Top anime en cours de diffusion (Top Airing)
    async fetchTopAiringAnime() {
        // /top/anime?filter=airing&sfw=true&page=1
        return this.get("/top/anime?filter=airing&sfw=true&page=1");
    }

    // Top anime à venir (Upcoming)
    async fetchUpcomingAnime() {
        // /top/anime?filter=upcoming&sfw=true&page=1
        return this.get("/top/anime?filter=upcoming&sfw=true&page=1");
    }

    async fetchTopAnime() {
        // Top anime général (sans filtre airing/upcoming)
        return this.get("/top/anime?sfw=true&page=1");
    }

    async fetchTopManga() {
        return this.get("/top/manga?sfw=true&page=1");
    }

    async searchAnimeByParams(query: string, params?: Array<string>, _param?: string) {
        // params = ["type=tv", "min_score=8"] par ex.
        const extra = params && params.length ? "&" + params.join("&") : "";
        const path =
            "/anime?q=" + encodeURIComponent(query) + "&sfw=true" + extra;

        return this.get(path);
    }

    async searchMangaByParams(query: string, params?: Array<string>, _param?: string) {
        const extra = params && params.length ? "&" + params.join("&") : "";
        const path =
            "/manga?q=" + encodeURIComponent(query) + "&sfw=true" + extra;

        return this.get(path);
    }
}
