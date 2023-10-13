import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  fullplot: {
    type: String,
    required: true,
  },
  languages: [
    {
      type: [String],
      required: true,
    },
  ],
  released: {
    type: Date,
    required: true,
  },
  directors: {
    type: [String],
    required: true,
  },
  writers: {
    type: [String],
    required: true,
  },
  awards: {
    wins: {
      type: Number,
      required: true,
    },
    nominations: Number,
    text: String,
  },
  lastupdated: Date,
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  countries: [String],
  type: String,
  tomatoes: {
    viewer: {
      rating: Number,
      numReviews: Number,
      meter: Number,
    },
    production: String,
    lastUpdated: Date,
  },
  num_mflix_comments: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
