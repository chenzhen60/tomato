use std::collections::HashMap;
use uuid::Uuid;

use crate::{
    models::{blog::Blog, clipboard::Clipboard},
    utils::time_util::TimeUitl,
};

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn blogs() -> Vec<Blog> {
    match Blog::list_all() {
        Ok(list) => list,
        Err(err) => {
            panic!("#{:?}", err)
        }
    }
}

#[tauri::command]
pub fn save_blog(params: HashMap<String, String>) -> bool {
    let blog = Blog {
        id: Uuid::new_v4().to_string(),
        content: params.get("content").unwrap().to_string(),
        created_at: TimeUitl::now_timestamp(),
    };

    match blog.save() {
        Ok(()) => true,
        Err(_) => false,
    }
}

#[tauri::command]
pub fn save_clipboard(text: &str) -> bool {
    let clipboard = Clipboard::new(String::from(text));
    if let Ok(()) = clipboard.save() {
        return true;
    }
    false
}

#[tauri::command]
pub fn clipboards() -> Vec<Clipboard> {
    match Clipboard::list_all() {
        Ok(list) => list,
        Err(err) => {
            panic!("{:?}", err)
        }
    }
}

#[tauri::command]
pub fn clipboards_with_search(s: &str) -> Vec<Clipboard> {
    match Clipboard::list_with_search(s) {
       Ok(list) => list,
       Err(err) => {
           panic!("{:?}", err)
       }
    }
}


