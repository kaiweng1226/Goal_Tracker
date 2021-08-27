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

}