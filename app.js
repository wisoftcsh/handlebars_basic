const hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

server.register(Vision, () => { //비전을 사용해서 핸들바를 등록하고 그 밑에 관리할 디렉토리는 패스에 있다
  server.views({
    engines: {
      html: require('handlebars')
    },
    path: 'view',
    layoutPath: 'view/layout', // layout을 사용한다고 알려주는 코드
    layout: 'default',
    partialsPath: 'view/partials'
  });
});

server.register(Inert, () => {
});

require('./route')(server);

server.start(() => {
  console.log('Server started at: ' + server.info.uri);
});