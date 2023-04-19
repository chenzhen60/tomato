import { Container, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.log(error);

    return (
        <Container>
            <Typography variant="h1">
                Oops!
            </Typography>
            <Typography variant="body1">
                Sorry, an unexpected error has occurred.
            </Typography>

            <Typography variant="body1">
                <i>{error.statusText || error.message}</i>
            </Typography>


        </Container >
    )

}
