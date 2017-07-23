var RSS = require('rss');
var fs = require('fs');

var feed = new RSS({
    feed_url: 'http://squirrelingpodcast.com/rss/squirrelingpodcast.rss',
    title: 'Squirreling Podcast',
    pubDate: 'Tue, 06 Jun 2017 03:54:24 +0000',
    lastBuildDate: 'Tue, 06 Jun 2017 03:54:24 +0000',
    ttl: '60',
    language: 'en',
    webMaster: 'squirrelingpodcast@gmail.com',
    description: 'Podcast by Squirreling Podcast',
    site_url: 'http://squirrelingpodcast.com',
    copyright: '2017 Squirreling Podcast',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
    custom_elements: [
      {'itunes:subtitle': 'A podcast about music and everything in between.'},
      {'itunes:author': 'Squirreling Podcast'},
      {'itunes:explicit': 'yes'},
      {'itunes:summary': 'Squirreling Podcast is dedicated to talking to local and national muscians about what they are up to and what they are listening to. Most of all he just wants to get to know other artists and talk about random shit.'},
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

fs.writeFile('components/rss/squirrelingpodcast.rss', fileNm);
