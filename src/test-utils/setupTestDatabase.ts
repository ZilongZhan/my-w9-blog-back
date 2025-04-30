import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Post from "../post/model/Post.js";
import connectToDatabase from "../database/connectToDatabase.js";
import { macAndCheeseDto, pulledPorkDto } from "../post/dto/fixtures.js";

const setupTestDatabase = (): void => {
  let database: MongoMemoryServer;

  beforeAll(async () => {
    database = await MongoMemoryServer.create();

    const connectionString = database.getUri();
    await connectToDatabase(connectionString);

    await Post.create(macAndCheeseDto, pulledPorkDto);
  });

  afterEach(async () => {
    Post.deleteMany({});

    await Post.create(macAndCheeseDto, pulledPorkDto);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await database.stop();
  });
};

export default setupTestDatabase;
