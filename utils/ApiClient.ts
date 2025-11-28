
export default class ApiClient {
    private baseUrl: string= "https://api.jikan.moe/v4/";
    private url?: string;
    private params?: string;
    private page: string = "1";
    

    setUrl(url:string) {
        this.url = url;
    }

    getUrl() {
        return this.baseUrl + this.url;
    }

    addParams(params: string) {
        this.params = params;
        return this.url + this.params;
    }

    setPage(page: string) {
        this.page = "&page=" + page;
        return this.url + this.page;
    } 

    fetchTopAnime = async () => {
        try {
            this.setUrl("top/anime");
            this.addParams("?sfw=true");
            this.setPage("1");
            if (this.params) {this.url = this.addParams(this.params)}
            this.url = this.setPage(this.page);
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
            if (this.params) {this.url = this.addParams(this.params)};
            this.url = this.setPage(this.page);
            const res = await fetch(this.baseUrl + this.url);
            const json = await res.json();
            return { data: json.data, error: null };
        
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    }

}