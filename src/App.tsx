import { Outlet } from "react-router-dom";
import "./App.css";
import LeftMenus from "./pages/left_menus";
import { useEffect } from "react";
import { emit, listen, type UnlistenFn } from "@tauri-apps/api/event";
import {
	TEXT_CHANGED,
	IMAGE_CHANGED,
	listenText,
	listenImage,
} from "tauri-plugin-clipboard-api";
import { invoke } from "@tauri-apps/api";
import { text } from "stream/consumers";

function App() {
	let tauriTextUnlisten: UnlistenFn;
	let tauriImageUnlisten: UnlistenFn;
	let textUnlisten: () => void;
	let imageUnlisten: () => void;

	async function startListening() {
		tauriTextUnlisten = await listen(TEXT_CHANGED, (event) => {
			const text = (event.payload as any).value;
			save_clipboard(text);
		});
		tauriImageUnlisten = await listen(IMAGE_CHANGED, (event) => {
			const text = (event.payload as any).value;
			save_clipboard(text);
		});
		imageUnlisten = listenImage();
		textUnlisten = listenText();
	}

	function is_whitespace(text: string): boolean {
		return /^\s*$/.test(text);
	}

	function save_clipboard(text: string) {
		if (is_whitespace(text)) {
			return false;
		}

		invoke<boolean>("save_clipboard", { text }).then((_) => {
			console.log("save successful");
		})
	}

	function stopListening() {
		imageUnlisten();
		textUnlisten();
		tauriTextUnlisten();
		tauriImageUnlisten();
	}


	useEffect(() => {
		startListening();
	}, [])

	return (
		<div className="flex flex-row h-screen overflow-hidden">
			<div className="w-3/12 h-screen">
				<LeftMenus />
			</div>
			<div className="w-9/12 h-screen overflow-auto">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
