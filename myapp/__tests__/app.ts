import  sum  from "../src/sum"
import route from "../src/goalRoute"
import { createConnection, getConnection } from "typeorm"
import * as express from "express";
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/", route);

import * as request from "supertest" //

const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    await getConnection().close();
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
beforeAll(async ()=>{
  await connection.create();
});

afterAll(async ()=>{
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
describe("Test the root path", () => {
  test("It should get all the goals", async function () {
    const res =
      await request(app)
      .get("/")
      console.log(res.body)
      expect(res.statusCode).toBe(200);
    });

  test("It should create a goal object", async function () {
    const res =
      await request(app)
      .post("/")
      .set('Content-Type', 'application/json')
      .send({goal: "hello",
             timeCommitment: 149,
             logging: 149
            });
      console.log(res)
      expect(res.statusCode).toBe(200);
    });
})
