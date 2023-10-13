import mongoose from "mongoose";
import "dotenv/config";
import Movie from "./model/Movie.js";

const { MONGODB_URI, DATABASE_NAME } = process.env;

async function findByMovieTitle(movieTitle) {
  try {
    const results = await Movie.find({ title: movieTitle });

    console.log(results);
  } catch (error) {
    console.error(error);
  }
}

async function findMovies(limit) {
  try {
    const results = await Movie.find(
      {},
      { title: 1, year: 1, _id: 0, genres: 1 }
    )
      .sort({ title: -1 })
      .limit(limit);

    // console.log(results);
    results.forEach((e, i, arr) => {
      console.log("______________________________________");
      console.log("Document: ", i + 1);
      console.log("title: ", e.title);
      console.log("year: ", e.year);
      console.log("genres: ", e.genres);
    });
  } catch (error) {
    console.error(error);
  }
}

async function performAggregation(limit) {
  try {
    const results = await Movie.aggregate()
      .project({
        _id: 0,
        title: 1,
        year: 1,
        genres: {
          $reduce: {
            input: "$genres",
            initialValue: "",
            in: {
              $concat: [
                "$$value",
                {
                  $cond: {
                    if: { $eq: ["$$value", ""] },
                    then: " ",
                    else: ", ",
                  },
                },
                "$$this",
              ],
            },
          },
        },
      })
      .sort({ title: -1 })
      .limit(limit);

    // console.log(results);
    results.forEach((e, i, arr) => {
      console.log("______________________________________");
      console.log("Document: ", i + 1);
      console.log("title: ", e.title);
      console.log("year: ", e.year);
      console.log("genres: ", e.genres);
    });
  } catch (error) {
    console.error(error);
  }
}

const main = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await findMovies(5);
    await findByMovieTitle("èxtasis");
    await performAggregation(5);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

main();
