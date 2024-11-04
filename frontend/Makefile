.PHONY: encode_images run

run:
	cd app && npx react-native start

encode_images: app/src/images.ts

app/src/images.ts:
	$(shell ./encode_images.sh)
