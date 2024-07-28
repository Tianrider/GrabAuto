import { useEffect, useState } from "react";
import locationPinGreen from "../assets/locationPinGreen.svg";
import locationPinWhite from "../assets/locationPinWhite.svg";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

interface Location {
    lat: number;
    lng: number;
    name: string;
}

interface MapComponentProps {
    locations: Location[];
    selectedLocation: Location | null;
}

const MapComponent: React.FC<MapComponentProps> = ({
    locations,
    selectedLocation,
}) => {
    useEffect(() => {
        // Initialize the map
        const map = L.map("map").setView(
            [locations[0]?.lat || 0, locations[0]?.lng || 0],
            13,
        );

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(map);

        // Add markers with labels
        locations.forEach((location) => {
            const marker = L.marker([location.lat, location.lng]).addTo(map);

            const label = L.divIcon({
                className: "custom-div-icon",
                html: `<div class="label">${location.name}</div>`,
                iconSize: [0, 0], // size of the icon
            });

            L.marker([location.lat, location.lng], { icon: label }).addTo(map);
        });

        // Zoom to selected location
        if (selectedLocation) {
            map.setView([selectedLocation.lat, selectedLocation.lng], 15);
        }

        // Clean up on unmount
        return () => {
            map.remove();
        };
    }, [locations, selectedLocation]);

    return <div id="map" className="h-full w-full"></div>;
};

interface MechanicsData {
    name: string;
    distance: number;
    geocodes: {
        main: {
            latitude: number;
            longitude: number;
        };
    };
    location: {
        formatted_address: string;
    };
}

const MechanicsItem = (props: {
    mechanic: MechanicsData;
    onClick: () => void;
    selected: boolean;
}) => {
    const { mechanic, onClick, selected } = props;
    return (
        <div
            className={`flex h-20 w-full items-center justify-start gap-4 px-8 ${
                selected ? "bg-green-100" : ""
            }`}
            onClick={onClick}
        >
            <div className="flex flex-col gap-1">
                <img
                    src={selected ? locationPinGreen : locationPinWhite}
                    alt=""
                    className="h-10"
                />
                <p className="text-xs">{mechanic.distance / 1000 + "km"}</p>
            </div>
            <div className="flex flex-col">
                <p className="font-bold">{mechanic.name}</p>
                <p className="text-sm">{mechanic.location.formatted_address}</p>
            </div>
        </div>
    );
};

export default function Mechanics() {
    const [mechanics, setMechanics] = useState<MechanicsData[]>([]);
    const [selectedMechanic, setSelectedMechanic] = useState<Location | null>(
        null,
    );
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "fsq3mSiMNzYLhY8MSGejwlGvMVkWiq/ZlF9uXoTv8z29Ntg=",
        },
    };

    const fetchMechanics = async () => {
        try {
            const response = await fetch(
                "https://api.foursquare.com/v3/places/search?ll=-6.293925748728909%2C106.78483067327302&categories=11010%2C11015%2C11012&sort=DISTANCE&limit=15",
                options,
            );
            const data = await response.json();
            console.log(data);
            setMechanics(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMechanics();
    }, []);

    const handleMechanicClick = (mechanic: MechanicsData) => {
        setSelectedMechanic({
            lat: mechanic.geocodes.main.latitude,
            lng: mechanic.geocodes.main.longitude,
            name: mechanic.name,
        });
    };

    return (
        <div className="sm:w-[30vw] flex h-screen w-full items-start">
            <div className="z-[2000] sm:w-[30vw] absolute top-0 flex w-full  gap-4 bg-white px-4 pb-3 pt-4">
                <ArrowLeft
                    className="aspect-square h-10 w-10 rounded-full bg-white text-black shadow-2xl"
                    onClick={() => navigate("/problem")}
                />
                <p className="font-bold">
                    Here's a list of mechanics that are best suited for you
                </p>
            </div>
            <div
                className={`sm:w-[30vw] flex w-full items-center justify-center ${
                    showMore ? "h-[5%]" : "h-3/5"
                }`}
            >
                <MapComponent
                    locations={mechanics.map((mechanic: MechanicsData) => ({
                        lat: mechanic.geocodes.main.latitude,
                        lng: mechanic.geocodes.main.longitude,
                        name: mechanic.name,
                    }))}
                    selectedLocation={selectedMechanic}
                />
            </div>
            <div
                className={`rounded-[10px] fixed bottom-0 flex w-full flex-col bg-white ${
                    showMore ? "h-[95%]" : "h-2/5"
                }`}
            >
                <div
                    className="flex h-7 w-full items-center justify-center py-1"
                    onClick={() => setShowMore(!showMore)}
                >
                    {!showMore ? (
                        <ChevronUp className="h-7 w-7 text-black" />
                    ) : (
                        <ChevronDown className="h-7 w-7 text-black" />
                    )}
                </div>
                <div
                    className={`sm:w-[30vw] h-full w-full ${
                        showMore ? "overflow-y-scroll" : "overflow-y-scroll"
                    }`}
                >
                    {mechanics.map((mechanic) => (
                        <MechanicsItem
                            key={mechanic.name}
                            mechanic={mechanic}
                            selected={selectedMechanic?.name === mechanic.name}
                            onClick={() => handleMechanicClick(mechanic)}
                        />
                    ))}
                </div>
                <div
                    className="sm:w-[30vw] flex h-52 w-full items-start justify-center bg-white px-4 py-8"
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.56) 50px 10px 50px 6px",
                    }}
                >
                    <p
                        className="w-full cursor-pointer rounded-full bg-green-500 py-3 text-center font-bold text-white"
                        onClick={() => navigate("/cost")}
                    >
                        Check Cost Estimation
                    </p>
                </div>
            </div>
        </div>
    );
}
