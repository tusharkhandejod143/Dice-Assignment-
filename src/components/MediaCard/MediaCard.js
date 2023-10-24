import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function MediaCard(props) {
    return (
        <Card sx={{ width: 300, margin: "30px" }} key={props.id}>
            <CardMedia
                sx={{ height: 300 }}
                image={props?.image}
                title={props?.imageAltText}
                alt={props?.imageAltText}
                style={{ objectFit: "cover" }}
            />
            <CardContent>
                <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                    Repo Name : {props.repo_name}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                    Stars : {props.stars}
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                    Language : {props.language}
                </Typography>
                <Typography
                    sx={{ fontSize: "14px", fontWeight: "400", marginTop: "10px" }}
                >
                    <b>Description : </b>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
