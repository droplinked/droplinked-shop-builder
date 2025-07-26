import axiosInstance from "lib/axiosConfig";

export interface ITrackFollow {
    platform: string;
}

interface IFollowStatus {
    _id: string;
    shopId: string;
    platform: string;
    followed: boolean;
    points: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Service to track follow on a platform
export const trackFollowService = (platform: ITrackFollow) =>
    axiosInstance.post("/quests/track-follow", platform);

// Service to grant Pro Plan
export const grantProPlanService = () =>
    axiosInstance.post("/quests/grant-pro-plan");

// Service to get follow status
export const getFollowStatusService = () =>
    axiosInstance.get<{ data: IFollowStatus[] }>("/quests/follow-status")
        .then(res => res.data);
