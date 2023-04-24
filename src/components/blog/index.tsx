import { Box, Stack, Typography } from "@mui/material";

function Blog() {
    return (
        <Box sx={{
            backgroundColor: 'white',
            padding: "20px 20px",
            borderRadius: '10px',
            boxShadow: '10px, 10px, 10px, 10px, rgba(0,0,0,0.5)',
            marginBottom: '15px',
        }}>
            <Stack direction={"row"}>
                <Typography variant="body2" color={'grey'}>
                    2023/4/24 20:32
                </Typography>
            </Stack>
            <Box sx={{
                paddingTop: '10px'
            }}>
                <Typography variant="h6">
                    Hello, Welcome to memos.
                </Typography>
            </Box>
        </Box>
    )
}


export default Blog;
