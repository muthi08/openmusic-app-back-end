/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat table song_playlists
  pgm.createTable('song_playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom playlist_id dan song_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint('song_playlists', 'unique_playlist_id_and_song_id', 'UNIQUE(playlist_id, song_id)');

  // memberikan constraint foreign key pada kolom playlist_id dan song_id terhadap playlists.id dan songs.id
  pgm.addConstraint('song_playlists', 'fk_song_playlists.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint('song_playlists', 'fk_song_playlists.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus tabel song_playlists
  pgm.dropTable('song_playlists');
};