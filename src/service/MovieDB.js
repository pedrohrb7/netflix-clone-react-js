/*
    To use this API you need register an account on The Movie DD
    https://www.themoviedb.org/ and insert  your API_KEY bellow.
    */
const API_KEY = "<API_KEY>";
const API_BASE = "https://api.themoviedb.org/3";

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
};

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix Recomendations",
        items: await basicFetch(
          `/discover/tv?with_network=213&api_key=${API_KEY}`
        ),
      },
      {
        slug: "trending",
        title: "Trending Tops",
        items: await basicFetch(`/trending/all/week?api_key=${API_KEY}`),
      },
      {
        slug: "top rated",
        title: "Top Rated",
        items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}`),
      },
      {
        slug: "action",
        title: "Action",
        items: await basicFetch(
          `/discover/movie?with_genres=28&api_key=${API_KEY}`
        ),
      },
      {
        slug: "comedy",
        title: "Comedy",
        items: await basicFetch(
          `/discover/movie?with_genres=35&api_key=${API_KEY}`
        ),
      },
      {
        slug: "terror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?with_genres=27&api_key=${API_KEY}`
        ),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genres=10749&api_key=${API_KEY}`
        ),
      },
      {
        slug: "documentary",
        title: "Documentary",
        items: await basicFetch(
          `/discover/movie?with_genres=99&api_key=${API_KEY}`
        ),
      },
    ];
  },

  getMovieInfo: async (typeId, type) => {
    let info = {};

    if (typeId) {
      switch (type) {
        case "movie":
          info = await basicFetch(`/movie/${typeId}?&api_key=${API_KEY}`);
          break;
        case "tv":
          info = await basicFetch(`/tv/${typeId}?&api_key=${API_KEY}`);
          break;
        default:
          info = null;
          break;
      }
    }
    return info;
  },
};
