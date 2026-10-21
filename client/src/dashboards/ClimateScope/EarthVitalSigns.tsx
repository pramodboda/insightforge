import { useEffect, useState } from "react";

import SectionTitle from "../../components/ProUI/SectionTitle";
import CardData from "../../components/ProUI/CardData";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const NASA_TEMP_CSV =
    "https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv";

const NOAA_CO2_CSV =
    "https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv";

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseCSV(text) {
    return text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => line.split(",").map((value) => value.trim()));
}

async function getTemperature() {
    const response = await fetch(NASA_TEMP_CSV);

    if (!response.ok) {
        throw new Error("NASA temperature data unavailable");
    }

    const rows = parseCSV(await response.text());
    const headerIndex = rows.findIndex((row) => row[0] === "Year");

    if (headerIndex === -1) {
        throw new Error("Unexpected NASA CSV format");
    }

    const header = rows[headerIndex];
    const data = rows.slice(headerIndex + 1);

    // Find the most recent available monthly observation.
    for (let i = data.length - 1; i >= 0; i--) {
        const row = data[i];
        const year = Number(row[0]);

        if (!Number.isFinite(year)) continue;

        for (let month = 12; month >= 1; month--) {
            const index = header.indexOf(MONTHS[month - 1]);
            const raw = Number(row[index]);

            // GISTEMP table values are hundredths of a degree C.
            if (
                index !== -1 &&
                Number.isFinite(raw) &&
                raw !== 999.9 &&
                raw !== -999.9
            ) {
                return {
                    value: raw / 100,
                    date: `${MONTHS[month - 1]} ${year}`,
                };
            }
        }
    }

    throw new Error("No valid NASA temperature observation found");
}

async function getCO2() {
    const response = await fetch(NOAA_CO2_CSV);

    if (!response.ok) {
        throw new Error("NOAA CO2 data unavailable");
    }

    const rows = parseCSV(await response.text());

    // NOAA monthly CSV columns:
    // year, month, decimal date, average, interpolated, trend, days
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];

        const year = Number(row[0]);
        const month = Number(row[1]);
        const average = Number(row[3]);

        if (
            Number.isInteger(year) &&
            Number.isInteger(month) &&
            month >= 1 &&
            month <= 12 &&
            Number.isFinite(average) &&
            average > 0
        ) {
            return {
                value: average,
                date: `${MONTHS[month - 1]} ${year}`,
            };
        }
    }

    throw new Error("No valid NOAA CO2 observation found");
}


export default function EarthVitalSigns({ title }) {
    const [temperature, setTemperature] = useState(null);
    const [co2, setCo2] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let active = true;

        async function loadData() {
            const results = await Promise.allSettled([
                getTemperature(),
                getCO2(),
            ]);

            if (!active) return;

            if (results[0].status === "fulfilled") {
                setTemperature(results[0].value);
            } else {
                setErrors((prev) => ({
                    ...prev,
                    temperature: "Unable to load NASA data",
                }));
            }

            if (results[1].status === "fulfilled") {
                setCo2(results[1].value);
            } else {
                setErrors((prev) => ({
                    ...prev,
                    co2: "Unable to load NOAA data",
                }));
            }
        }

        loadData();

        return () => {
            active = false;
        };
    }, []);

    const cards = [
        {
            title: "Global warming",
            value: temperature
                ? `${temperature.value > 0 ? "+" : ""}${temperature.value.toFixed(2)}°C`
                : errors.temperature
                    ? "Unavailable"
                    : "Loading…",
            source: temperature
                ? `NASA GISTEMP · ${temperature.date}`
                : "NASA GISTEMP",
            description:
                "Global temperature anomaly relative to the 1951–1980 average. This is not the change from pre-industrial levels.",
        },
        {
            title: "CO₂ concentration",
            value: co2 ? `${co2.value.toFixed(2)} ppm` : errors.co2
                ? "Unavailable"
                : "Loading…",
            source: co2
                ? `NOAA Mauna Loa · ${co2.date}`
                : "NOAA Global Monitoring Laboratory",
            description:
                "Monthly atmospheric CO₂ measurement at Mauna Loa, Hawaii.",
        },
        {
            title: "Global sea level",
            value: "~115 mm",
            source: "NASA · published 2026 indicator",
            description:
                "Approximate global mean sea-level rise since 1993. Check NASA for the latest revised measurement.",
        },
        {
            title: "Ice loss",
            value: "~395 Gt/yr",
            source: "NASA GRACE/GRACE-FO · published estimates",
            description:
                "Combined approximate annual mass loss: Greenland (~260 Gt/yr) and Antarctica (~135 Gt/yr).",
        },
    ];


    return (<>
        {/* <SectionTitle caption="01 · THE SIGNAL" title="Earth's vital signs" />

        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">Global warming</Typography>
                    <Typography variant="h6">+1.3°C*</Typography>
                    <Typography variant="body2">Earth is warmer than the pre-industrial baseline.</Typography>
                </CardData>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">CO₂ concentration</Typography>
                    <Typography variant="h6">420+ ppm*</Typography>
                    <Typography variant="caption">ATMOSPHERIC CO₂</Typography>
                    <Typography variant="body2">More heat-trapping gas in the atmosphere.</Typography>
                </CardData>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">Global Sea level</Typography>
                    <Typography variant="h6">+ mm</Typography>
                    <Typography variant="body2">Oceans are rising as water warms and land ice melts.</Typography>
                </CardData>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">Ice loss</Typography>
                    <Typography variant="h6">− Gt/yr</Typography>
                    <Typography variant="body2">Melting ice sheets lose billions of tonnes of ice.</Typography>
                </CardData>

            </Grid>
        </Grid> */}

        <SectionTitle
            caption="01 · THE SIGNAL"
            title="Earth's vital signs"
        />

        <Grid container spacing={2}>
            {cards.map((card) => (
                <Grid
                    key={card.title}
                    size={{ xs: 12, sm: 6, md: 3 }}
                >
                    <CardData sx={{ height: "200px" }}>
                        <Typography variant="body1">
                            {card.title}
                        </Typography>

                        <Typography variant="h6">
                            {card.value}
                        </Typography>

                        <Typography
                            variant="caption"
                            display="block"
                            sx={{ mb: 0.5 }}
                        >
                            {card.source}
                        </Typography>

                        <Typography variant="body2">
                            {card.description}
                        </Typography>
                    </CardData>
                </Grid>
            ))}
        </Grid>

    </>)
}