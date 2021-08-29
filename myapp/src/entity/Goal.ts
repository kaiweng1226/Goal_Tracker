import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Goal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goal: string;

    @Column()
    timeCommitment: number;

    @Column()
    logging: number;

    constructor(goal:string, timeCommitment:number, logging:number){
        this.goal = goal
        this.timeCommitment = timeCommitment
        this.logging = logging
    }

}