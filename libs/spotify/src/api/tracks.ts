import http from '../http';
import { toArray } from '@streem/utility/misc/arrays';

const endpoint = '/tracks';

/**
 * It gets a track by its id.
 * @param {string} id - The Spotify ID for the track.
 * @param {string} [market] - an ISO 3166-1 alpha-2 country code.
 * @returns The Spotify API returns a JSON object with the track's information.
 */
export const getTrack = (id: string, market?: string) => {
    const url = [endpoint, id].join('/');
    const params = { market };

    return http.get<Spotify.SingleTrackResponse>(url, { params });
};

/**
 * Get multiple tracks by their IDs
 * @param {string | string[]} ids - A string or array of strings representing the Spotify track IDs.
 * @param {string} [market] - An ISO 3166-1 alpha-2 country code.
 * @returns The response is an array of track objects.
 */
export const getTracks = (ids: string | string[], market?: string) => {
    ids = toArray(ids).join(',');

    const params = {
        ids,
        market,
    };

    return http.get<Spotify.MultipleTracksResponse>(endpoint, { params });
};
