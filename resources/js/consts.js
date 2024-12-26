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
    {
        name: "carriers.index",
        text: "Fuvarozók",
        protected: true,
    },
    // {
    //     name: "carriers.index",
    //     text: "Címzettek",
    //     protected: true,
    // },
    // {
    //     name: "admins.index",
    //     text: "Adminisztrátorok",
    //     protected: true,
    // },
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
        name: "plate_number",
        text: "Rendszám",
    },
    {
        name: "carrier",
        text: "Tulajdonos",
    },
    {
        name: "created_at",
        text: "Rögzítve",
    },
];

export const CARRIER_TABLE_COLUMNS = [
    {
        name: "id",
        text: "#",
    },
    {
        name: "full_name",
        text: "Név",
    },
    {
        name: "email",
        text: "E-mail cím",
    },
    {
        name: "created_at",
        text: "Regisztrálva",
    },
]

export const SHIPMENT_STATUS = {
    issued: "Kiosztva",
    progress: "Folyamatban",
    finished: "Elvégezve",
    failed: "Sikertelen",
};

export const getRoleName = (admin) => {
    return admin == 1 ? "Adminisztrátor" : "Fuvarozó";
};
