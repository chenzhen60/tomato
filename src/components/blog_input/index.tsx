import { Box, Button, Stack, TextField } from "@mui/material";

export default function BlogInput() {
    return (
        <Box sx={{
            backgroundColor: 'white',
            padding: "20px 20px",
            borderRadius: '10px',
            boxShadow: '10px, 10px, 10px, 10px, rgba(0,0,0,0.5)',
            margin: '10px 0px',
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
