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
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postSongToPlaylistHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getSongsInPlaylistHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deleteSongFromPlaylistHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/activities',
    handler: handler.getPlaylistActivitiesHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  }
];

module.exports = routes;