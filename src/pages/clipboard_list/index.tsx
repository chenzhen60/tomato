import { event, invoke } from "@tauri-apps/api";
import React, { useEffect, useState } from "react";
import { ClipBoard } from "../../types";

function ClipboardList() {
	let [clips, setClips] = useState<ClipBoard[]>([]);
	let [search_str, setSearchStr] = useState<string>("");
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
	}, []);

	async function fetch_list_with_search(s: String) {
		console.log("=======");
		console.log(s);

		const list: ClipBoard[] = await invoke<ClipBoard[]>("clipboards_with_search", { s: s }).then((res) => {
			return res.map((item) => {
				return {
					id: item.id,
					text: item.text,
					created_at: item.created_at,
				};
			});
		});

		console.log("=======");
		console.log(list);

		setClips(list);
	}

	const update_search_str = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchStr(event.target.value);
	}

	const search = () => {

		console.log("=search begin======");
		console.log(search_str);
		fetch_list_with_search(search_str);		
	}


	return <div>
		<div className="m-4 p-2 flex float-right">
			<input type={'text'} value={search_str} onChange={update_search_str} />
			<button className="ml-4" onClick={search}>Search</button>
		</div>
		{
			clips.map((item) => {
				return <ClipBoardShow key={item.id} clip={item} />
			})
		}
	</div>
}


function ClipBoardShow(props: { clip: ClipBoard }) {

	return <div className="w-full flex flex-col m-4 p-2 bg-white rounded-lg">
		<p className="whitespace-pre line-clamp-5 text-ellipsis">
			{props.clip.text}
		</p>
	</div>

}

export default ClipboardList;
