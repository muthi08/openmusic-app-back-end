const InvariantError = require('../../exceptions/InvariantError');
const { AlbumLikesPayloadSchema } = require('./schema');

const AlbumLikesValidator = {
  validateAlbumLikesPayload: (payload) => {
    const validationResult = AlbumLikesPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumLikesValidator;