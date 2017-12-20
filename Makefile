all:
	rm -rf dist
	./dev/builder/build.sh -s --no-zip --no-tar --overwrite
	mv dev/builder/release/ckeditor dist
	npm install
	grunt concat:sources
	cp skins/moono/icons.png dist/skins/moono/icons.png
	cp skins/moono/icons_hidpi.png dist/skins/moono/icons_hidpi.png
