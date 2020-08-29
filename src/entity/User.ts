import { Group } from "./Group";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
  })
  discordId?: string;

  @ManyToMany(() => Group, (group) => group.users)
  groups?: Promise<Group[]>;
}
