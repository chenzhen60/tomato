import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { ClipBoard } from "../../types";

function ClipboardList() {
	let [clips, setClips] = useState<ClipBoard[]>([]);
	useEffect(() => {
		const fetch_list = async () => {
			const list: ClipBoard[] = await invoke<ClipBoard[]>("clipboards").then((res) => {
				return res.map((item) => {
					return {
						id: item.id,
						text: item.text,
						created_at: item.created_at,
					};
				});
			});
			setClips(list);
			console.log(list);
		};
		fetch_list();
	}, [])

	return <div>
		{
			clips.map((item) => {
				return <p> {item.text} </p>
			})
		}
	</div>
}


export default ClipboardList;