import route from "../src/routes/goalRoute"
import { createConnection, getConnection } from "typeorm"
import * as express from "express";
import {Goal} from "../src/entity/Goal"
// creates another instance of app just for this test
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/", route);

import * as request from "supertest" //
// sets up the connection for the database
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

// the actual testing
describe("Test the root path", () => {
  test("It should get all the goals", async function () {
    
    const connection = getConnection()
    const goal1 = new Goal("Goal1", 1, 1)
    const goal2 = new Goal("Goal2", 2, 2)
    const goal3 = new Goal("Goal3", 3, 3)
    await connection.manager.save([goal1, goal2, goal3])

    const res =
      await request(app)
      .get("/")

    const actual = await connection.manager.find(Goal)

    console.log(res.body)
    console.log(actual)

    expect(res.body).toEqual(actual)
    expect(res.statusCode).toBe(200)
    });
  })

describe("Test the root path", () => {
    
    test("It should create a goal object", async function () {
      const res =
        await request(app)
        .post("/")
        .set('Content-Type', 'application/json')
        .send({goal: "hello",
               timeCommitment: 149,
               logging: 149
              });
        const connection = getConnection();
        expect(connection.manager.findOne(Goal, res.body.id)).toBeDefined();
      });
})

describe("Testing Getting Individual Goals", () => {
  test("testing invalid goalID param", async function () {

    const res =
      await request(app)
      .get("/test")

    expect(res.body.errors).toBeDefined()
    expect(res.statusCode).toBe(400)
    });

  test("testing valid goalID param", async function () {

    const connection = getConnection()
    const goal1 = new Goal("Goal1", 1, 1)
    goal1.id = 100;
    await connection.manager.save(goal1)

    const res =
      await request(app)
      .get("/100")
    
    console.log(res.body.goal)
    expect(res.body.goal).toEqual(goal1)
    expect(res.statusCode).toBe(200)
    });
  
})



