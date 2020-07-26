import { Group } from "./Group";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
  })
  discord_id?: string;

  @ManyToMany((type) => Group, (group) => group.users)
  groups?: Array<Group>;
}
