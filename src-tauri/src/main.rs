use once_cell::sync::OnceCell;
use r2d2_sqlite::SqliteConnectionManager;
use tauri_plugin_log::LogTarget;

use crate::{
    api::{blogs, clipboards, greet, save_blog, save_clipboard},
    utils::db_util::DBUtil,
};

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayMenu};

pub mod api;
pub mod models;
pub mod utils;

pub static DB_POOL: OnceCell<r2d2::Pool<SqliteConnectionManager>> = OnceCell::new();

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(tauri::SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_item(show);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard::init())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir])
                .build(),
        )
        .setup(|app| {
            DBUtil::init_db_pool(app).unwrap();
            DBUtil::init_db_table().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            blogs,
            save_blog,
            save_clipboard,
            clipboards
        ])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            tauri::SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    #[cfg(not(target_os = "macos"))]
                    window.hide().unwrap();
                    #[cfg(target_os = "macos")]
                    tauri::AppHandle::hide(&window.app_handle()).unwrap();
                }
                "show" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                #[cfg(not(target_os = "macos"))]
                event.window().hide().unwrap();
                #[cfg(target_os = "macos")]
                tauri::AppHandle::hide(&event.window().app_handle()).unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
