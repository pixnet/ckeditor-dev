/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

( function() {
	CKEDITOR.plugins.add( 'uploadimage', {
		requires: 'uploadwidget',

		onLoad: function() {
			CKEDITOR.addCss(
				'.cke_upload_uploading img{' +
					'opacity: 0.3' +
				'}'
			);
		},

		init: function( editor ) {
			// Do not execute this paste listener if it will not be possible to upload file.
			if ( !CKEDITOR.plugins.clipboard.isFileApiSupported ) {
				return;
			}

			var fileTools = CKEDITOR.fileTools,
				uploadUrl = fileTools.getUploadUrl( editor.config, 'image' );

			if ( !uploadUrl ) {
				CKEDITOR.error( 'uploadimage-config' );
				return;
			}

			// Handle images which are available in the dataTransfer.
			fileTools.addUploadWidget( editor, 'uploadimage', {
				supportedTypes: /image\/(jpeg|png|gif|bmp)/,

				uploadUrl: uploadUrl,

				fileToElement: function() {
					var img = new CKEDITOR.dom.element( 'img' );
					img.setAttribute( 'src', loadingImage );
					return img;
				},

				parts: {
					img: 'img'
				},

				onUploading: function( upload ) {
					// Show the image during the upload.
					this.parts.img.setAttribute( 'src', upload.data );
					// set normal (600px) width and height
					var sizes = getNormalImgSize(this.parts.img.$.naturalWidth, this.parts.img.$.naturalHeight);
					this.parts.img.setAttribute( 'width', sizes.width );
					this.parts.img.setAttribute( 'height', sizes.height );
				},

				onUploaded: function( upload ) {
					var img = this.parts.img.$,
						that = this;
					// 檢查完 orientation 後確認真實的寬高後在處理設定圖片寬高的部份
					getOrientation(upload.file, function getOrientation (orientation) {
						var changeWH = 5 <= orientation && 8 >= orientation,
							width = changeWH ? img.naturalHeight : img.naturalWidth,
							height = changeWH ? img.naturalWidth : img.naturalHeight,
							sizes = getNormalImgSize(width, height);
						// Set width and height to prevent blinking.
						that.replaceWith('<img src="' + upload.url + '" ' +
							'width="' + sizes.width + '" ' +
							'height="' + sizes.height + '">');
						// fire change event when image finish uploaded
						editor.fire('change');
					});
				}
			});

			// 參考 http://stackoverflow.com/a/32490603/2426806 答案取得圖片的 Orientation
			// error code: not jpeg(-2), not defined(-1)
			// 1,2,3,4 上下相反或顛倒（不影響寬高）
			// 5,6,7,8 左右相反（影響寬高，寬高會相反）
			function getOrientation(file, callback) {
				// 假如沒有檔案或是不資源 FileReader，回傳 -1
				if (!file || !window.FileReader || !window.FileReader.prototype.readAsArrayBuffer) {
					callback(-1);
				}
				// 避免出錯，catch 到錯誤還是要回傳 callback
				try {
					var reader = new FileReader();
					reader.onload = function(e) {
						var view = new DataView(e.target.result);
						// 檢查是否是 jpg (非 jpg 沒有 EXIF 資訊）
						if (view.getUint16(0, false) != 0xFFD8) {
							return callback(-2);
						}
						var length = view.byteLength,
							offset = 2;
						while (offset < length) {
							var marker = view.getUint16(offset, false);
							offset += 2;
							if (marker == 0xFFE1) {
								if (view.getUint32(offset += 2, false) != 0x45786966) {
									return callback(-1);
								}
								var little = view.getUint16(offset += 6, false) == 0x4949;
								offset += view.getUint32(offset + 4, little);
								var tags = view.getUint16(offset, little);
								offset += 2;
								for (var i = 0; i < tags; i++) {
									if (view.getUint16(offset + (i * 12), little) == 0x0112) {
										return callback(view.getUint16(offset + (i * 12) + 8, little));
									}
								}
							}
							else if ((marker & 0xFF00) != 0xFF00) break;
							else offset += view.getUint16(offset, false);
						}
						return callback(-1);
					};
					reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
				} catch (e) {
					callback(-1);
				}
			}

			// calculate new image size，make sure max size of image edge is 600px
			function getNormalImgSize (oW, oH) {
				var maxSize = 600,
					values = {
						width: oW,
						height: oH
					};
				if (!oW || !oH || (oW <= maxSize && oH <= maxSize)) {
					return values;
				}
				// width is larger than height
				if (oW > oH) {
					values.width = maxSize;
					values.height = parseInt(oH * (maxSize / oW));
				} else {
					values.height = maxSize;
					values.width = parseInt(oW * (maxSize / oH));
				}
				return values;
			}

			// Handle images which are not available in the dataTransfer.
			// This means that we need to read them from the <img src="data:..."> elements.
			editor.on( 'paste', function( evt ) {
				// For performance reason do not parse data if it does not contain img tag and data attribute.
				if ( !evt.data.dataValue.match( /<img[\s\S]+data:/i ) ) {
					return;
				}

				var data = evt.data,
					// Prevent XSS attacks.
					tempDoc = document.implementation.createHTMLDocument( '' ),
					temp = new CKEDITOR.dom.element( tempDoc.body ),
					imgs, img, i;
				// Without this isReadOnly will not works properly.
				temp.data( 'cke-editable', 1 );

				temp.appendHtml( data.dataValue );

				imgs = temp.find( 'img' );

				for ( i = 0; i < imgs.count(); i++ ) {
					img = imgs.getItem( i );

					// Image have to contain src=data:...
					var isDataInSrc = img.getAttribute( 'src' ) && img.getAttribute( 'src' ).substring( 0, 5 ) == 'data:',
						isRealObject = img.data( 'cke-realelement' ) === null;

					// We are not uploading images in non-editable blocs and fake objects (#13003).
					if ( isDataInSrc && isRealObject && !img.data( 'cke-upload-id' ) && !img.isReadOnly( 1 ) ) {
						var loader = editor.uploadRepository.create( img.getAttribute( 'src' ) );
						loader.upload( uploadUrl );

						fileTools.markElement( img, 'uploadimage', loader.id );

						fileTools.bindNotifications( editor, loader );
					}
				}

				data.dataValue = temp.getHtml();
			} );
		}
	} );

	// jscs:disable maximumLineLength
	// Black rectangle which is shown before image is loaded.
	var loadingImage = 'data:image/gif;base64,R0lGODlhDgAOAIAAAAAAAP///yH5BAAAAAAALAAAAAAOAA4AAAIMhI+py+0Po5y02qsKADs=';
	// jscs:enable maximumLineLength

	/**
	 * The URL where images should be uploaded.
	 *
	 * @since 4.5
	 * @cfg {String} [imageUploadUrl='' (empty string = disabled)]
	 * @member CKEDITOR.config
	 */
} )();
