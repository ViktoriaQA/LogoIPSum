import replace from 'gulp-replace';      // пошук та заміна 
import plumber from 'gulp-plumber';      // обробка помилок
import notify from 'gulp-notify';        // повідомлення (підказки)
import browsersync from 'browser-sync';  // локальний сервер
import newer from 'gulp-newer';          // Перевірка оновлення images
import ifPlugin from 'gulp-if'

export const plugins = {
    replace:replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
} 