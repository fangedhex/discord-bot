import { IAudio } from "./IAudio";

/**
 * Represents an user
 * Its implementation is made by the bridges
 */
export interface IUser {
  getName(): string;
  sendText(message: string): void;
  getAudio(): IAudio | undefined;
}
