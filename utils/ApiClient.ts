export default class ApiClient {
    private readonly baseUrl: string = "https://api.jikan.moe/v4";
    private url?: string;
    private param?: string;
    private params?: Array<string>;
    private page: string = "1";


    private async get(path: string): Promise<{ data: any[] | null; error: string | null }> {
        try {
            const res = await fetch(`${this.baseUrl}${path}`);
            const json = await res.json();
            return { data: json.data ?? null, error: null };
        } catch (err: any) {
            return { data: null, error: err?.message ?? String(err) };
        }
    }

    setUrl(url:string) {
        this.url = url;
    }

    addParams(param: string) {
        this.param = param;
        return this.url += this.param;
    }

    async fetchTopAiringAnime() {
        return this.get("/top/anime?filter=airing&sfw=true&page=1");
    }

    async fetchUpcomingAnime() {
        return this.get("/top/anime?filter=upcoming&sfw=true&page=1");
    }

    async fetchTopAnime() {
        return this.get("/top/anime?sfw=true&page=1");
    }

    async fetchTopManga() {
        return this.get("/top/manga?sfw=true&page=1");
    }

    searchAnimeByParams = async (query: string, params?: Array<string>, param?: string) => {
        try {
            this.setUrl("/anime");
            this.addParams(`?q=${encodeURIComponent(query)}`);
            if (params) {
                params.forEach((param) => {
                    this.addParams("&" + param);
                });
            }

            this.addParams("&sfw=true");
            
            const res = await fetch(this.baseUrl + this.url);
            const json = await res.json();
            return { data: json.data ?? null, error: null };
        } catch (err: any) {
            return { data: null, error: err?.message ?? String(err) };
        }
    }

    searchMangaByParams = async (query: string, params?: Array<string>, param?: string) => {
        try {
            this.setUrl("/manga");
            this.addParams(`?q=${encodeURIComponent(query)}`);
            if (params) {
                params.forEach((param) => {
                    this.addParams("&" + param);
                });
            }

            this.addParams("&sfw=true");
            
            const res = await fetch(this.baseUrl + this.url);
            const json = await res.json();
            return { data: json.data ?? null, error: null };
        } catch (err: any) {
            return { data: null, error: err?.message ?? String(err) };
        }
    }
}
