import Typography from "@mui/material/Typography"

export default function SectionTitle({ caption, title, }) {

    return (<>
        {caption && <Typography variant="caption">{caption}</Typography>}
        <Typography variant="h6">{title}</Typography>
    </>)
}