import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

export const options = {
    stages: [
        {duration: '30s', target: 10},
        {duration: '60s', target: 5},
        {duration: '30s', target: 0},
    ],
};

const baseUrl = 'http://fr-admin-back:3030';
// K6 "Rate" metric for counting Javascript errors during a test run.
var script_errors = Rate("script_errors");

// Wraps a K6 test function with error counting.
function wrapWithErrorCounting(fn) {
    return (data) => {
        try {
            fn(data);
            script_errors.add(0);
        } catch (e) {
            script_errors.add(1);
            throw e;
        }
    }
}

// A very simple test
function simpleTest() {
    let response = http.get(`${baseUrl}/api`);
    check(response, {
        "200 OK": (r) => r.status === 200,
    });
    sleep(0.5);
}

export default wrapWithErrorCounting(simpleTest);