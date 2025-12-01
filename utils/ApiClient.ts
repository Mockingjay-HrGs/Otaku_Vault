
export default class ApiClient {
    private baseUrl: string= "https://api.jikan.moe/v4/";
    private url?: string;
    private param?: string;
    private params?: Array<string>;
    private page: string = "1";
    

    setUrl(url:string) {
        this.url = url;
    }

    getUrl() {
        return this.baseUrl += this.url;
    }

    addParams(param: string) {
        this.param = param;
        return this.url += this.param;
    }

    setPage(page: string) {
        this.page = "&page=" + page;
        return this.url += this.page;
    } 

    fetchTopAnime = async () => {
        try {
            this.setUrl("top/anime");
            this.addParams("?sfw=true");
            this.setPage("1");
            const res = await fetch(this.baseUrl + this.url);
            const json = await res.json();
            return { data: json.data, error: null };
        
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    }

    fetchTopManga = async () => {
        try {
            this.setUrl("top/manga");
            this.addParams("?sfw=true");
            this.setPage("1");
            const res = await fetch(this.baseUrl + this.url);
            const json = await res.json();
            return { data: json.data, error: null };
        
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    }

    searchAnimeByParams = async (query: string, params?: Array<string>, param?: string) => {
        try {
            this.setUrl("anime");
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
            this.setUrl("manga");
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