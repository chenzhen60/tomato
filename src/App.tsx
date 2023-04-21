import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import "./App.css";
import LeftMenus from "./pages/left_menus";

function App() {

    return (
        <Box sx={{
            height: "100%",
            width: "100%",
        }}
        >
            <Stack direction={"row"}>
                <Box sx={{
                    height: '100%',
                    width: '20%'
                }}>
                    <LeftMenus />
                </Box>
                <Outlet />
            </Stack >
        </Box >
    );
}

export default App;
