import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";


interface MenuProps {
    title: string,
    url: string,
    is_selected: boolean,
}

function Menu(props: MenuProps) {
    return (
        <Box
            margin={"auto"}
            sx={{
                border: "1px dashed grey",
                margin: "20px auto"
            }}>
            <Link to={props.url}>
                <Typography variant="h6" noWrap sx={{
                }}>
                    {props.title}
                </Typography>
            </Link>
        </Box>
    )
}

function LeftMenus() {
    return (
        <Box sx={{
            height: "100%",
            width: "100%",
            border: "1px dashed grey"
        }}>
            <Stack>
                <Menu
                    title="Home"
                    url="/home"
                    is_selected={false}
                />
                <Menu
                    title="Daily Review"
                    url="/daily_review"
                    is_selected={false}
                />
                <Menu
                    title="Explore"
                    url="/home"
                    is_selected={false}
                />
                <Menu
                    title="Ask AI"
                    url="/home"
                    is_selected={false}
                />

                <Menu
                    title="Resources"
                    url="/home"
                    is_selected={false}
                />
                <Menu
                    title="Settings"
                    url="/home"
                    is_selected={false}
                />

            </Stack>
        </Box>
    )
}


export default LeftMenus;
