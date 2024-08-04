interface MissionParticipationReward {
    type: "CREDIT" | "SUBSCRIPTION";
    value: string;
    _id: string;
}

export interface Participation {
    categoryId: {
        name: string;
        _id: string;
    }
    createdAt: string;
    description: string;
    isActive: boolean;
    isSubscriptionNeeded: boolean;
    name: string;
    rewards: MissionParticipationReward[]
    task: string;
    updatedAt: string;
    _id: string;
    isCompleted?: boolean
}