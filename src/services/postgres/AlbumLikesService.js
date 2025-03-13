const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbumLike(albumId, userId) {
    const id = `albumlike-${nanoid(16)}`;

    // Cek apakah album ada
    const albumQuery = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };
    const albumResult = await this._pool.query(albumQuery);

    if (!albumResult.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    // cek apakah sudah pernah menyukai
    const albumLikeQuery = {
      text: 'SELECT * FROM user_album_likes WHERE album_id = $1 AND user_id = $2',
      values: [albumId, userId],
    };

    const albumLikeresult = await this._pool.query(albumLikeQuery);

    if (albumLikeresult.rows.length) {
      throw new InvariantError('Gagal menyukai album yang sama');
    }

    const insertQuery = {
      text: 'INSERT INTO user_album_likes (id, album_id, user_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, albumId, userId],
    };
    const insertResult = await this._pool.query(insertQuery);

    if (!insertResult.rows.length) {
      throw new InvariantError('Gagal menyukai album');
    }

    await this._cacheService.delete(`likes:${albumId}`);
    return insertResult.rows[0].id;
  }

  async deleteAlbumLike(albumId, userId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE album_id = $1 AND user_id = $2 RETURNING id',
      values: [albumId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menghapus like');
    }

    await this._cacheService.delete(`likes:${albumId}`);
  }

  async getAlbumLikesByAlbumId(albumId) {
    try {
      // mendapatkan likes dari cache
      const result = await this._cacheService.get(`likes:${albumId}`);
      return { likes: JSON.parse(result), isFromCache: true };
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      const query = {
        text: 'SELECT COUNT(*) AS likes FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };
      const result = await this._pool.query(query);

      const likes = parseInt(result.rows[0].likes, 10);

      // likes akan disimpan pada cache sebelum fungsi dikembalikan
      await this._cacheService.set(`likes:${albumId}`, JSON.stringify(likes));
      return { likes, isFromCache: false };
    }
  }
}

module.exports = AlbumLikesService;