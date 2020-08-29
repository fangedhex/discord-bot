import { User } from "./User";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ default: false })
  isTag!: boolean;

  @ManyToMany(() => User, (user) => user.groups)
  users?: Promise<User[]>;
}
