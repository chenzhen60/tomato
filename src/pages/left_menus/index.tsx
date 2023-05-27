import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  AiOutlineCalendar,
  AiOutlineHome,
  AiOutlinePaperClip,
  AiOutlineRobot,
} from "react-icons/ai";
import { HiOutlineHashtag } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";

interface MenuProps {
  title: string;
  url: string;
  is_selected: boolean;
}

function Menu(props: MenuProps) {
  return (
    <Box
      sx={{
        margin: "10px 0px",
      }}
    >
      <Link to={props.url}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h6" sx={{ fontSize: '18px' }}>
            <MenuIcon title={props.title} />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontSize: "18px",
              marginLeft: '10px',
            }}
          >
            {props.title}
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
}

interface MenuIconProps {
  title: string;
}

function MenuIcon(props: MenuIconProps) {
  switch (props.title) {
    case "Home":
      return <AiOutlineHome />;
    case "Daily Review":
      return <AiOutlineCalendar />;
    case "Explore":
      return <HiOutlineHashtag />;
    case "Ask AI":
      return <AiOutlineRobot />;
    case "Resources":
      return <AiOutlinePaperClip />;
    case "Settings":
      return <CiSettings />;

    default:
      return <div />;
  }
}

function LeftMenus() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        marginLeft: "20px",
        marginRight: "5px",
        marginTop: "25px",
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <Menu title="Home" url="/home" is_selected={false} />
        <Menu title="Daily Review" url="/daily_review" is_selected={false} />
        <Menu title="Explore" url="/home" is_selected={false} />
        <Menu title="Ask AI" url="/home" is_selected={false} />
        <Menu title="Resources" url="/home" is_selected={false} />
        <Menu title="Settings" url="/home" is_selected={false} />
      </Stack>
    </Box>
  );
}

export default LeftMenus;
