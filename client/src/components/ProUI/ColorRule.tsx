import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import { indigo } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),

    borderRadius: 0,
    minHeight: "180px"
}));

export default function ColorRule() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5">Color Rule</Typography>
            <Grid container>

                <Grid size={6}>
                    <Typography variant="h5">60%</Typography>
                    <Typography variant="body2">PRIMARY</Typography>
                    <Item sx={{ background: "#f9f9f9" }}></Item>
                    <Typography variant="body2">#f9f9f9</Typography>
                </Grid>
                <Grid size={4}>
                    <Typography variant="h5">30%</Typography>
                    <Typography variant="body2">SECONDARY</Typography>
                    <Item sx={{ background: "#1e1e1e" }}></Item>
                    <Typography variant="body2">#1e1e1e</Typography>
                </Grid>
                <Grid size={2}>
                    <Typography variant="h5">10%</Typography>
                    <Typography variant="body2">ACCENT</Typography>
                    <Item sx={{ background: indigo["A700"] }}></Item>
                    <Typography variant="body2">#304ffe</Typography>
                </Grid>

            </Grid>
        </Box>
    );
}