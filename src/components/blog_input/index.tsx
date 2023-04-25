import { Box, Button, Stack, TextField } from "@mui/material";

export default function BlogInput() {
    return (
        <Box sx={{
            backgroundColor: 'white',
            padding: "20px 20px",
            borderRadius: '10px',
            margin: '10px 0px',
            boxShadow: 2,
        }}>
            <TextField
                variant="standard"
                multiline
                maxRows={5}
                rows={2}
                sx={{
                    width: '100%', border: 'none'
                }} />
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                sx={{
                    marginTop: '10px'
                }}>
                <Box></Box>
                <Button variant="contained" disabled color="success">
                    Save
                </Button>
            </Stack>
        </Box>
    )
}
