const platformNames = {
    netflix: 'Netflix',
    prime: 'Amazon Prime Video',
    max: 'HBO Max',
    paramount: 'Paramount Plus',
    disney: 'Disney Plus',
    hulu: 'Hulu',
    youtube: 'Youtube TV',
    crunchyroll: 'Crunchyroll',
};

const platformKeys = Object.fromEntries(
    Object.entries(platformNames).map(([key, val]) => [val, key])
);

export { platformNames, platformKeys };