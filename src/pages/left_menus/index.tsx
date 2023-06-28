import { Link } from "react-router-dom";
import {
	AiOutlineCalendar,
	AiOutlineHome,
	AiOutlinePaperClip,
	AiOutlineRobot,
} from "react-icons/ai";
import { HiOutlineHashtag } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { BiGame } from "react-icons/bi";
import { BsClipboardCheck } from "react-icons/bs";

interface MenuProps {
	title: string;
	url: string;
	is_selected: boolean;
}

function Menu(props: MenuProps) {
	return (
		<div className="mx-2 my-0">
			<Link to={props.url}>
				<div className="flex flex-row justify-center">
					<p>
						<h6><MenuIcon title={props.title} /> </h6>
					</p>
					<p className="ml-3"	>
						<h6>{props.title}</h6>
					</p>
				</div>
			</Link>
		</div>
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
		case "Tomatos":
			return <BiGame />;
		case "Clipboard":
			return <BsClipboardCheck />;

		default:
			return <div />;
	}
}

function LeftMenus() {
	return (
		<div>
			<div className="flex flex-col justify-self-center items-start">
				<Menu title="Home" url="/home" is_selected={false} />
				<Menu title="Clipboard" url="/clipboard" is_selected={false} />
				<Menu title="Explore" url="/home" is_selected={false} />
				<Menu title="Ask AI" url="/home" is_selected={false} />
				<Menu title="Resources" url="/home" is_selected={false} />
				<Menu title="Settings" url="/home" is_selected={false} />
			</div>
		</div>
	);
}

export default LeftMenus;
