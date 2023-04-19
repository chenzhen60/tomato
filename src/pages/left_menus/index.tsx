import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function LeftMenus() {
    return (
        <Box>
            <Stack>
                <Typography>
                    <a href={`/home`}>Home</a>
                </Typography>
                <Typography>
                    <a href={`/daily_review`}>Daily Review</a>
                </Typography>
                <Typography>
                    Explore
                </Typography>
                <Typography>
                    Ask AI
                </Typography>
                <Typography>
                    Resources
                </Typography>
                <Typography>
                    Settings
                </Typography>
            </Stack>
        </Box>
    )
}


export default LeftMenus;
