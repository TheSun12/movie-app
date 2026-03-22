export interface Movie {
    id: number;
    name: string;
    alternativeName?: string;
    year: number;
    rating: {
        kp: number;
        imdb: number;
    };
    poster?: {
        url?: string;
        previewUrl?: string;
    };
    description: string;
    genres: Array<{name: string}>;
}

export interface Filters {
    genres?: string[];
    ratingStart?: number;
    ratingFinish?: number;
    yearStart?: number;
    yearFinish?: number;
    page?: number;
    limit?: number;
}

export interface MoviesResponce {
    docs: Movie[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}