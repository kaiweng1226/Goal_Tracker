import goalRoute from "../src/routes/goalRoute"
import userRoute from "../src/routes/userRoute"
import {createConnection, getConnection} from "typeorm"
import * as express from "express";
import {Goal} from "../src/entity/Goal"

// creates another instance of app just for this test

const app = express();
app.use(express.json())                           // for parsing application/json
app.use(express.urlencoded({ extended: true }))   // for parsing application/x-www-form-urlencoded
app.use("/goal", goalRoute);
app.use("/user", userRoute)

import * as request from "supertest"

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

describe("Test Getting All Goals", () => {

  test("test getting all goals", async function () {
    
    const connection = getConnection()
    const goal1 = new Goal("Goal1", 1, 1)
    const goal2 = new Goal("Goal2", 2, 2)
    const goal3 = new Goal("Goal3", 3, 3)
    await connection.manager.save([goal1, goal2, goal3])

    const res =
      await request(app)
      .get("/goal")

    const actual = await connection.manager.find(Goal)

    // console.log(res.body)
    // console.log(actual)

    expect(res.body).toEqual(actual)
    expect(res.statusCode).toEqual(200)
  });

})



describe("Test Getting Individual Goals", () => {

  test("test invalid goalID param", async function () {

    const res =
      await request(app)
      .get("/goal/test")

    expect(res.body.errors).toBeDefined()
    expect(res.statusCode).toBe(400)
    });

  test("test valid goalID param", async function () {

    const connection = getConnection()
    const goal = new Goal("Goal", 5, 10)
    goal.id = 100;
    await connection.manager.save(goal)

    const res =
      await request(app)
      .get("/goal/100")
    
    // console.log(res.body.goal)
    expect(res.body.goal).toEqual(goal)
    expect(res.body.errors).toBeUndefined()
    expect(res.statusCode).toBe(200)
    });
  
})



describe("Test Creating New Goal", () => {
    
  test("test creating new goal", async function () {
    const res =
      await request(app)
      .post("/goal")
      .set('Content-Type', 'application/json')
      .send({goal: "Goal",
              timeCommitment: 5,
              logging: 10
            });
    const connection = getConnection();
    expect(connection.manager.findOne(Goal, res.body.id)).toBeDefined();
    expect(res.statusCode).toEqual(200)
  });

})



describe("Test Updating Existing Goal", () => {
    
  test("test updating existing goal", async function () {

    const connection = getConnection()
    const goal = new Goal("Goal", 5, 10)
    goal.id = 200;
    await connection.manager.save(goal)

    const res =
      await request(app)
      .put("/goal/200")
      .set('Content-Type', 'application/json')
      .send({goal: "newGoal",
              timeCommitment: 25,
              logging: 50
            });
    
    // console.log(res.body.goal)
    expect(res.body.goal.goal).toEqual("newGoal")
    expect(res.body.goal.timeCommitment).toEqual(25)
    expect(res.body.goal.logging).toEqual(50)
    expect(res.body.errors).toBeUndefined()
    expect(res.statusCode).toBe(200)
    });

})

describe("Test Deleting Existing Goal", () => {
    
  test("test deleting existing goal", async function () {

    const connection = getConnection()
    const goal = new Goal("Goal", 5, 10)
    goal.id = 300;
    await connection.manager.save(goal)

    const res =
      await request(app)
      .delete("/goal/300")
    
    const res2 =
      await request(app)
      .get("/goal/300")

    // console.log(res.body)
    // console.log(res2.body)
    expect(res2.body).toEqual({})
    expect(res.body.errors).toBeUndefined()
    expect(res2.body.errors).toBeUndefined()
    expect(res.statusCode).toEqual(200)
    expect(res2.statusCode).toEqual(200)
    });

})