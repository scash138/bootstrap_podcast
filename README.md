# bootstrap_podcast
- bounce mp3's to high quality and run 'ffmpeg -i Squirreling-Podcast-Episode-4.mp3  -codec:a libmp3lame -qscale:a 6 output.mp3'
- compress images and add to corresponding images folder
- add json object
- run npm run rss to build rss feed
- gulp run to build
- sync to aws 'aws s3 sync /Users/sterlingcash/Desktop/dev/git/bootstrap_podcast/builds/development/ s3://squirrelingpodcast.com
- 700 x700 play image 1500 x 1500 image
