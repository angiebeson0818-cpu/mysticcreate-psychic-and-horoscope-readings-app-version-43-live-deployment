import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    getDailyHoroscope(sign: string): Promise<string | null>;
    getLoveHoroscope(sign: string): Promise<string | null>;
    getNewPsychicReading(username: string): Promise<string>;
    getRandomGeneralReading(): Promise<string>;
}
