const parseFeed = (items) => {    

  let feed = []
  if (items[0].title) {
    console.log(items[0].title)
  }
  items.forEach(item => {
    const entry = {
      title: item.title._text || item.title._cdata,
      date: item.pubDate._text,
      content: item['content:encoded']
        ? ( item['content:encoded']._text || item['content:encoded']._cdata )
        : ( item.description._text || item.description._cdata )
    }
    feed.push(entry)
  })
  return feed
}

module.exports = parseFeed
