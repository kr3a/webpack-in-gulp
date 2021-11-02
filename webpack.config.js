// const path = require('path');

// module.exports = {
//   mode: 'production',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
// };


'use strict';

let path = require('path'); //данную переменную мы не трогаем

module.exports = {
  mode: 'production', //режим в котором работает наш Webpack и их всего 2 webpack.js.org/configuration/mode/#usage (устанавливает оптимизацию в зависимости от того в какой стадии находится проект разработка/продакшен)
  entry: './src/js/script.js', //тот файл с которого мы начинаем 
  output: { //файл выхода который мы создаем только в виде объекта т.е конфигурируем файл который получим в итоге
    filename: 'bundle.js', //то как файл будет называться 
    path: __dirname + '/dist/js' //то куда мы будем его складывать
  },
  watch: true, //если стоит позийия 'true' то webpack после того как был вызван будет отслеживать изменение наших файлов и в автоматическом режиме собирать наш проект каждый раз когда мы сохраняем измененные файлы (его можно гибко настроить если обратиться к конфигуратору) webpack.js.org/configuration/watch/

  devtool: "source-map", // webpack.js.org/configuration/devtool/

  module: {} // webpack.js.org/concepts/modules/    можно еще подключать плагины (используется не часто т.к почти все необходимые плагины включены во внутрь webpack webpack.js.org/configuration/mode/#usage)
};
