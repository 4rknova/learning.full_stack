#!/bin/bash
OUTPUT=./app/src/images.ts

echo "// Auto generated code" > $OUTPUT

for i in img/*.png
do
    img=$(basename ${i%%.*})
    echo "Processing $i"
    echo "export const $img = '$(base64 -w 0 $i)';" >> $OUTPUT
done
