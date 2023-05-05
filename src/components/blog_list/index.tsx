import { List } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { refresh_blogs_state } from "../../state";
import { Blog as BlogType } from "../../types";
import Blog from "../blog";

export default function BlogList() {
    const refresh_blogs = useRecoilValue(refresh_blogs_state);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetch_blogs = async () => {
            const list: BlogType[] = await invoke<BlogType[]>("blogs").then((res) => {
                return res.map((item) => {
                    return {
                        id: item.id,
                        content: item.content,
                        created_at: item.created_at,
                    };
                });
            });
            setBlogs(list);
        };

        fetch_blogs()
    }, [refresh_blogs]);

    return (
        <List>
            {
                blogs.map((item) => (
                    <Blog key={item.id} blog={item} />
                ))
            }
        </List>
    );
}
