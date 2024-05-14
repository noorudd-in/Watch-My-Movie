import { create } from "zustand";

export type Watchlist = {
  imdbID: string;
  Title: string;
  Type: string;
  Poster: string;
  availableOn: string;
  imdbRating: string;
  GenreArray: string[];
};

export type Viewed = {
  imdbID: string;
  Title: string;
  Type: string;
  myRating: string;
  imdbRating: string;
  imdbVotes: string;
  Released: string;
  Genre: string;
  GenreArray: string[];
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  availableOn: string;
  customRation: string[];
};

export type State = {
  watchlist: Watchlist[];
  viewed: Viewed[];
  genres: string[];
};

export type Action = {
  addViewed?: () => void;
  updateViewed?: () => void;
  deleteViewed?: () => void;
  setWatchlist: (data: Watchlist[]) => void;
  addWatchlist: (
    imdbID: string,
    Title: string,
    Type: string,
    Poster: string,
    availableOn: string,
    imdbRating: string,
    GenreArray: string[]
  ) => void;
  updateWatchlist?: () => void;
  deleteWatchlist?: () => void;
};

export const useMovieStore = create<State & Action>()((set) => ({
  watchlist: [],
  viewed: [],
  genres: [],
  setWatchlist: (data: Watchlist[]) => set({ watchlist: data }),
  addWatchlist: (
    imdbID: string,
    Title: string,
    Type: string,
    Poster: string,
    availableOn: string,
    imdbRating: string,
    GenreArray: string[]
  ) =>
    set((state) => ({
      watchlist: [
        ...state.watchlist,
        { imdbID, Title, Type, Poster, availableOn, imdbRating, GenreArray },
      ],
    })),
}));
