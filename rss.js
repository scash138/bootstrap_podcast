var RSS = require('rss');
var fs = require('fs');

var feed = new RSS({
    feed_url: 'http://squirrelingpodcast.com/rss/squirrelingpodcastitunes.rss',
    title: 'The Squirreling Podcast',
    pubDate: 'Tue, 06 Jun 2017 03:54:24 +0000',
    lastBuildDate: 'Tue, 06 Jun 2017 03:54:24 +0000',
    link: 'http://squirrelingpodcast.com',
    docs: 'http://squirrelingpodcast.com',
    language: 'en',
    webMaster: 'squirrelingpodcast@gmail.com',
    description: 'Podcast by Squirreling',
    site_url: 'http://squirrelingpodcast.com',
    copyright: 'Copyright © Squirreling Podcast',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      {'image': [

          {'url': 'http://squirrelingpodcast.com/images/squirreling_logo_square.jpg'},
          {'title': 'The Squirreling Podcast'},
          {'link': 'http://squirrelingpodcast.com'}

      ]},
      {'generator': 'Squirreling Engine'},
      {'itunes:type': 'episodic'},
      {'itunes:new-feed-url': 'http://squirrelingpodcast.com/rss/squirrelingpodcastitunes.rss'},
      {'managingEditor' : 'squirrelingpodcast@gmail.com'},
      {'itunes:subtitle': 'Squirreling weekly podcast..'},
      {'itunes:keywords': 'squirreling,squirrelingpodcast,squirreling podcast'},
      {'itunes:author': 'Squirreling'},
      {'itunes:explicit': 'yes'},
      {'itunes:summary': 'The podcast of musician Squirreling..'},
      {'itunes:owner': [
        {'itunes:name': 'The Squirreling Podcast'},
        {'itunes:email': 'squirrelingpodcast@gmail.com'}
      ]},
      {'itunes:image': {
        _attr: {
          href: 'http://squirrelingpodcast.com/images/squirreling_logo_square.jpg'
        }
      }},
      {'itunes:category': [
        {_attr: {
          text: 'Music'
        }}
      ]},
      {'itunes:category': [
        {_attr: {
          text: 'Comedy'
        }}
      ]},
    ]
});

var json = require('./components/js/podcasts.json');


for (var i = 0; i < json.podcasts.length; i++) {
  feed.item({
      title:  'Episode #' + json.podcasts[i].episode + ' - ' + json.podcasts[i].guest,
      description: json.podcasts[i].description_raw,
      guid: json.podcasts[i].guid,
      url: json.podcasts[i].soundcloudfile,
      date: json.podcasts[i].date,
      enclosure: {url:json.podcasts[i].soundcloudfile,
      size: json.podcasts[i].enclore_length,
      type: "audio/mpeg"},
      custom_elements: [
      {'itunes:image': 'http://squirrelingpodcast.com/images/squirreling_logo_square.jpg'},
      {'itunes:subtitle': json.podcasts[i].description_subtitle},
      {'content:encoded': json.podcasts[i].description_subtitle},
      {'itunes:duration': json.podcasts[i].duration},
      {'itunes:author': 'The Squirreling Podcast'},
      {'itunes:explicit': 'yes'},
      {'itunes:episodeType': 'full'},
      {'itunes:keywords': json.podcasts[i].keywords}
    ]
      // {'itunes:image': {
      //   _attr: {
      //     href: 'http://squirrelingpodcast.com/' + json.podcasts[i].image
      //   }
      // }},
      // {'itunes:duration': '7:04'}
  });
  // console.log(json.podcasts[i].description);
}

var fileNm = feed.xml({indent: true});

fs.writeFile('components/rss/squirrelingpodcastitunes.rss', fileNm);
