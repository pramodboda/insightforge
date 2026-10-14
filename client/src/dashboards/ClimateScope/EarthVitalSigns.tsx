import SectionTitle from "../../components/ProUI/SectionTitle";
import CardData from "../../components/ProUI/CardData";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";


export default function EarthVitalSigns({ title }) {
    return (<>
        <SectionTitle caption="01 · THE SIGNAL" title="Earth's vital signs" />

        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">Global warming</Typography>
                </CardData>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">CO₂ concentration</Typography>
                    <Typography variant="caption">ATMOSPHERIC CO₂</Typography>


                </CardData>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">Global Sea level</Typography>
                </CardData>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CardData sx={{ height: "200px" }}>
                    <Typography variant="body1">Ice loss</Typography>
                </CardData>

            </Grid>
        </Grid>




    </>)
}