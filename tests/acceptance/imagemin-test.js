import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

// Original images sizes (from AJAX Content-Length header)
const uncompressedSizes = {
  'jpg': 35863,
  'png': 11795,
  'svg': 4619
};

moduleForAcceptance('Acceptance | imagemin');

test('Image files are compressed', function(assert) {
  assert.expect(3);

  visit('/');

  andThen(function() {

    // Compare the Content-Length of each image against the original
    // file size. Dummy app is setup to enable compression, so the
    // file sizes should be smaller.
    Object.keys(uncompressedSizes).forEach((ext) => {
      const url = `/logo.${ext}`;
      const uncompressedSize = uncompressedSizes[ext];

      $.get(url).then((data, status, xhr) => {
        const compressedSize = parseInt(xhr.getResponseHeader('Content-Length'), 10);

        assert.ok(compressedSize < uncompressedSize);
      });
    });

  });
});
