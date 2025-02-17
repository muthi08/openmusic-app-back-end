const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}',
    handler: handler.getPlaylistByIdHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/playlists/{id}',
    handler: handler.putPlaylistByIdHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
];

module.exports = routes;