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

export type customFields = {
  id: string;
  label: string;
  value: string;
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
  customRatingFields: customFields[];
};

export type State = {
  watchlist: Watchlist[];
  viewed: Viewed[];
  genres: string[];
};

export type Action = {
  setViewed: (data: Viewed[]) => void;
  setWatchlist: (data: Watchlist[]) => void;
  setGenres: (data: string[]) => void
};

export const useMovieStore = create<State & Action>()((set) => ({
  watchlist: [],
  viewed: [],
  genres: [],
  setWatchlist: (data: Watchlist[]) => set({ watchlist: data }),
  setViewed: (data: Viewed[]) => set({ viewed: data }),
  setGenres: (data: string[]) => set({genres: data})
}));
