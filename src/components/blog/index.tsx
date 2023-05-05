import { Box, Stack, Typography } from "@mui/material";
import {Blog as BlogType} from "../../types";

function Blog(props: {blog: BlogType}) {
    return (
        <Box sx={{
            backgroundColor: 'white',
            padding: "20px 20px",
            borderRadius: '10px',
            boxShadow: 2,
            marginBottom: '15px',
        }}>
            <Stack direction={"row"}>
                <Typography variant="body2" color={'grey'}>
                    {new Date(props.blog.created_at * 1000).toLocaleString()}
                </Typography>
            </Stack>
            <Box sx={{
                paddingTop: '10px'
            }}>
                <Typography variant="h5" sx={{
                        fontSize: '16px',
                    }}>
                    {props.blog.content}
                </Typography>
            </Box>
        </Box>
    )
}


export default Blog;
