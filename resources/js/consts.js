export const LINKS = [
    {
        name: "dashboard",
        text: "Főoldal",
        protected: false,
    },
    {
        name: "shipments.index",
        text: "Munkák",
        protected: false,
    },
    {
        name: "vehicles.index",
        text: "Járművek",
        protected: true,
    },
];

export const SHIPMENT_TABLE_COLUMNS = [
    {
        name: "id",
        text: "#",
    },
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
        name: "carrier",
        text: "Fuvarozó",
    },
    {
        name: "created_at",
        text: "Rögzítve",
    },
];

export const VEHICLE_TABLE_COLUMNS = [
    {
        name: "id",
        text: "#",
    },
    {
        name: "brand",
        text: "Márka",
    },
    {
        name: "model",
        text: "Model",
    },
    {
        name: "carrier",
        text: "Tulajdonos",
    },
];

export const SHIPMENT_STATUS = {
    issued: "Kiosztva",
    progress: "Folyamatban",
    finished: "Elvégezve",
    failed: "Sikertelen",
};

export const getRoleName = (admin) => {
    return admin == 1 ? "Adminisztrátor" : "Fuvarozó";
};
