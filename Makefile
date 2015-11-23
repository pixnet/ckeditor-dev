all:
	rm -rf dist
	./dev/builder/build.sh -s --no-zip --no-tar --overwrite
	mv dev/builder/release/ckeditor dist
	npm install
	grunt concat:lang

