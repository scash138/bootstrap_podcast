var RSS = require('rss');
var fs = require('fs');

var feed = new RSS({
    feed_url: 'http://squirrelingpodcast.com/rss/squirrelingpodcast.rss',
    title: 'Squirreling Podcast',
    pubDate: 'Tue, 06 Jun 2017 03:54:24 +0000',
    lastBuildDate: 'Tue, 06 Jun 2017 03:54:24 +0000',
    link: 'http://squirrelingpodcast.com',
    docs: 'http://squirrelingpodcast.com',
    language: 'en',
    webMaster: 'squirrelingpodcast@gmail.com',
    description: 'Podcast by Squirreling Podcast',
    site_url: 'http://squirrelingpodcast.com',
    copyright: 'Copyright © Squirreling Podcast',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      {'generator': 'Squirreling Engine'},
      {'managingEditor' : 'squirrelingpodcast@gmail.com'},
      {'itunes:subtitle': 'Squirreling weekly podcast..'},
      {'itunes:keywords': 'music,squirreling,talking,texas'},
      {'itunes:author': 'Squirreling Podcast'},
      {'itunes:explicit': 'yes'},
      {'itunes:summary': 'The podcast of musician Squirreling..'},
      {'itunes:owner': [
        {'itunes:name': 'Squirreling Podcast'},
        {'itunes:email': 'squirrelingpodcast@gmail.com'}
      ]},
      {'itunes:image': {
        _attr: {
          href: 'http://squirrelingpodcast.com/images/itunes_logo.png'
        }
      }},
      {'itunes:category': [
        {_attr: {
          text: 'Music'
        }}
      ]}
    ]
});

var json = require('./components/js/podcasts.json');


for (var i = 0; i < json.podcasts.length; i++) {
  feed.item({
      title:  'Episode ' + json.podcasts[i].episode,
      description: json.podcasts[i].description_raw,
      url: 'http://squirrelingpodcast.com/' + json.podcasts[i].audiofile,
      date: json.podcasts[i].date,
      enclosure: {url:'http://squirrelingpodcast.com/' + json.podcasts[i].audiofile},
      custom_elements: [
      {'itunes:duration': json.podcasts[i].duration},
      {'itunes:author': 'Squirreling Podcast'},
      {'itunes:explicit': 'yes'},
      {'itunes:subtitle': 'Episode ' + json.podcasts[i].episode + ' w/ ' + json.podcasts[i].guest}
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

fs.writeFile('components/rss/test_mine.rss', fileNm);
