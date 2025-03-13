class AlbumLikesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumLikesHandler = this.postAlbumLikesHandler.bind(this);
    this.deleteAlbumLikesHandler = this.deleteAlbumLikesHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
  }

  async postAlbumLikesHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._service.addAlbumLike(albumId, userId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumLikesHandler(request) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._service.deleteAlbumLike(albumId, userId);

    return {
      status: 'success',
      message: 'Like berhasil dihapus',
    };
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    const { likes, isFromCache } = await this._service.getAlbumLikesByAlbumId(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });

    if (isFromCache) {
      response.header('X-Data-Source', 'cache');
    }

    return response;
  }
}

module.exports = AlbumLikesHandler;