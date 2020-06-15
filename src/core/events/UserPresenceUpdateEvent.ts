import { IUser } from "../IUser";

interface Activity {
    name: string;
}

interface Presence {
    activities: Activity[];
}

export class UserPresenceUpdateEvent {
    constructor(
        public readonly user: IUser,
        public readonly presence: Presence,
        public readonly oldPresence?: Presence
    ) {
    }
}
