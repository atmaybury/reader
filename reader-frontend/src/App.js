import React, { useState, useEffect } from 'react'
import subsService from './services/subs'
import SideBar from './components/SideBar'
import ContentPanel from './components/ContentPanel'
import './App.css'

const App = () => {
  // STATES
  const [ currentSub, setCurrentSub ] = useState('')
  const [ feeds, setFeeds ] = useState([])

  // on page load
  useEffect(() => {
    document.body.style.backgroundColor = 'antiquewhite'
  }, [])

  // get rss data and create new feed object
  const getFeed = async sub => {
    console.log('getting feed from', sub.name)
    const items = await subsService.getFeed(sub.url)
    let feed = {
      name: sub.name,
      items: []
    }
    items.forEach(item => {
      console.log(item)
      const entry = {
        title: item.title._text || item.title._cdata,
        date: item.pubDate._text,
        content: item.['content:encoded']
          ? ( item.['content:encoded']._text || item['content:encoded']._cdata )
          : ( item.description._text || item.description._cdata )
      }
      feed.items.push(entry)
    })
    setFeeds(feeds.concat(feed))
    return feed
  }

  // change currently displayed feed
  const displayFeed = async sub => {
    const existing = feeds.find(f => f.name === sub.name)  
    setCurrentSub(existing
      ? existing
      : await getFeed(sub)
    )
  }
  
  return (
    <div className='container'>
      <SideBar displayFeed={displayFeed} />
      <ContentPanel currentSub={currentSub} />
    </div>
    )
}

export default App;
