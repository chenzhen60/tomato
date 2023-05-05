import { Box, Button, Stack, TextField } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { refresh_blogs_state } from "../../state";

export default function BlogInput() {
    const [text, setText] = useState("");
    const [refresh_blogs, set_refresh_blogs] = useRecoilState(refresh_blogs_state)

    const save_blog = () => {
        const params = {
            content: text,
        };

        invoke<boolean>("save_blog", { params: params }).then((_) => {
            setText("");
            set_refresh_blogs(refresh_blogs+1);
        });
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "20px 20px",
                borderRadius: "10px",
                margin: "10px 0px",
                boxShadow: 2,
            }}
        >
            <TextField
                variant="standard"
                multiline
                maxRows={5}
                rows={2}
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
                sx={{
                    width: "100%",
                    border: "none",
                }}
            />
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                    marginTop: "10px",
                }}
            >
                <Box></Box>
                <Button
                    variant="contained"
                    disabled={text === "" || text === null}
                    color="success"
                    onClick={save_blog}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
}
