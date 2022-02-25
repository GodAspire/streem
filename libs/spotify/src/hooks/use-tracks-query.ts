import { useQuery } from 'react-query';
import { getTrack, getTracks } from '../api/tracks';

export const useTrackQuery = (id: string, market?: string) => useQuery([id, market], () => getTrack(id, market));
export const useTracksQuery = (ids: string | string[], market?: string) =>
    useQuery([...ids, market], () => getTracks(ids, market));
