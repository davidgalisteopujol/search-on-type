export interface University {
    domains:          string[];
    "state-province": null;
    country:          Country;
    alpha_two_code:   AlphaTwoCode;
    web_pages:        string[];
    name:             string;
}

export enum AlphaTwoCode {
    Es = "ES",
}

export enum Country {
    Spain = "Spain",
}
