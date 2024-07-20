import axiosInstance from "../axiosConfig";
import { Participation } from "./interfaces";

export const getParticipatesService = () => axiosInstance.get<{ data: { data: Participation[] } }>("gamification/participates?page=1&limit=100").then(res => res.data)

export const checkMissionCompletionService = (missionId: string) => axiosInstance.post(`gamification/participate/${missionId}`).then(res => res.data)