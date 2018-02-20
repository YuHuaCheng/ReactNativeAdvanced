import axios from 'axios';
import qs from 'qs';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';

const buildJobsUrl = ({ latitude, longitude }) => {
    const query = qs.stringify({ lat: latitude, long: longitude });
    return `${JOB_ROOT_URL}${query}`
};

export const fetchJobs = (region, callback) => async dispatch => {
    try {
        const url = buildJobsUrl(region);
        let { data } = await axios.get(url);
        dispatch({
            type: FETCH_JOBS,
            payload: { results: data.slice(0, 5) }
        });
        callback();
    } catch(err) {
        console.error(err);
    }
};

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
};

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    }
};

