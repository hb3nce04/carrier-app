export const LINKS = [
    {
        name: "dashboard",
        text: "Főoldal",
    },
    {
        name: "shipment.index",
        text: "Munkák",
    },
];

export const SHIPMENT_TABLE_COLUMNS = [
    {
        name: "departure_address",
        text: "Indulási cím",
    },
    {
        name: "arrival_address",
        text: "Érkezési cím",
    },
    {
        name: "status",
        text: "Státusz",
    },
    {
        name: "consignee",
        text: "Címzett",
    },
    {
        name: "carrier_name",
        text: "Fuvarozó",
    },
];

export const SHIPMENT_STATUS = {
    issued: "Kiosztva",
    progress: "Folyamatban",
    finished: "Elvégezve",
    failed: "Sikertelen",
};
