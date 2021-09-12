import * as UserEntity from "../entity/User"
// used to fix a type error
declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserEntity.User {}

  }

}

declare module "express-session" {
  interface Session {
    viewCount: number;
  }
}
