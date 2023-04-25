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
            sx={{
                margin: "10px 0px"
            }}>
            <Link to={props.url}>
                <Typography variant="h5" noWrap sx={{
                    fontSize: '18px'
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
            marginLeft: '20px',
            marginRight: '5px',
            marginTop: '25px'
        }}>
            <Stack direction={"column"} alignItems={"flex-start"} justifyContent={"center"}>
                <Menu
                    title="Homee"
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
