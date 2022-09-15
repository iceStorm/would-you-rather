const path = require('path')
const fs = require('fs')

fs.readdir(path.resolve(__dirname, '../public/avatar-gallery'), (err, files) => {
    if (err) {
        throw err
    }

    console.log('gallery avatars:', files)
    const obj = Object.fromEntries(
        files.map((file) => {
            return [file.split('.')[0], file]
        }),
    )

    fs.writeFile(
        path.resolve(__dirname, '../src/assets/gallery-avatars.json'),
        JSON.stringify(obj, null, 3),
        { encoding: 'utf-8' },
        (err) => {
            if (err) {
                throw err
            }

            console.log('create "/src/assets/gallery-avatars.json" file for avatars in public folder...');
        },
    )
})
