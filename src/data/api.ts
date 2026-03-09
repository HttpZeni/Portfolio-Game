export interface DiscordAssets {
    large_image: string;
    large_text: string;
    small_image?: string;
    small_text?: string;
    }

export interface DiscordTimestamps {
    start?: number;
    end?: number;
}

export interface DiscordActivity {
    id: string;
    name: string;
    type: number;
    created_at: number;
    state?: string;
    emoji?: {
        id?: string;
        name: string;
        animated?: boolean;
    };
    application_id?: string;
    details?: string;
    assets?: DiscordAssets;
    timestamps?: DiscordTimestamps;
    buttons?: string[];
    flags?: number;
    platform?: string;
    session_id?: string;
}

export interface DiscordUser {
    id?: string;
    username?: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    global_name?: string;
    display_name?: string;
}

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface SpotifyData {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: {
        start: number;
        end: number;
    };
}

export interface DiscordPresenceData {
    discord_status: DiscordStatus;
    discord_user: DiscordUser;
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_embedded: boolean;
    active_on_discord_vr: boolean;
    activities: DiscordActivity[];
    listening_to_spotify: boolean;
    spotify: SpotifyData | null;
    kv: Record<string, string>;
}

export interface DiscordPresenceResponse {
    success: boolean;
    data: DiscordPresenceData;
}

export const fetchDcData = async (): Promise<DiscordPresenceResponse> => {
    try {
        const res = await fetch("https://api.lanyard.rest/v1/users/791804494723285013");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: DiscordPresenceResponse = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};