import axios from 'axios';
import qs from 'qs';

import {
    FETCH_JOBS
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
            payload: { results: data }
        });
        callback();
    } catch(err) {
        console.error(err);
    }
};