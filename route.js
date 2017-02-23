/**
 * Created by choiseonho on 2017. 2. 23..
 */

const Client = require('node-rest-client').Client;
const client = new Client();
const async = require('async');

module.exports = function (server) {
  server.route([
    {
      method: 'GET',
      path: '/static/css/{file*}',
      handler: {
        directory: {
          path: 'static/css',
          listing: true
        }
      }
    },
    {
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        return reply.view('index');
      }
    },
    {
      method: 'GET',
      path: '/index2',
      handler: function (request, reply) {
        const data = {
          title: 'This is index2 html',
          message: '밤 늦게 고생이 많습니다.'
        }
        return reply.view('index2', data);
      }
    },
    {
      method: 'GET',
      path: '/account',
      handler: function (request, reply) {
        client.get("http://203.230.100.65:8200/api/v1/accounts/1", (data) => {
          return reply.view('account', data);
        });
      }
    },
    {
      method: 'GET',
      path: '/multi',
      handler: function (request, reply) {
        async.parallel([ // 병렬 처리 하겠다
          function (callback) {
            client.get("http://203.230.100.65:8200/api/v1/accounts/2", (data) => {
              callback(null, {account: data});
            });
          },
          function (callback) {
            client.get("http://203.230.100.65:8200/api/v1/cncs/1", (data) => {
              callback(null, {cnc: data});
            });
          }],
        function (err, results) {
          console.log({results: results});
          return reply.view('multi', {results: results});
        });
      }
    },
  ]);
};