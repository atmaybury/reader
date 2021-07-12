import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSub, getFeed } from './../reducers/subReducer'
import subsService from './../services/subs'

const SubsPanel = () => {
  const dispatch = useDispatch()
  const subs = useSelector(state => state.subs.subs)
  const feeds = useSelector(state => state.subs.feeds)

  const displayFeed = async sub => {
    const existing = feeds.find(f => f.name === sub.name)  
    dispatch(setCurrentSub(existing
      ? existing
      : await getNewFeed(sub)
    ))
  }

  const getNewFeed = async sub => {
    console.log('getting feed from', sub.name)
    const items = await subsService.getFeed(sub.url)
    let feed = {
      name: sub.name,
      id: sub.id,
      items: []
    }
    items.forEach(item => {
      const entry = {
        title: item.title._text || item.title._cdata,
        date: item.pubDate._text,
        content: item.['content:encoded']
          ? ( item.['content:encoded']._text || item['content:encoded']._cdata )
          : ( item.description._text || item.description._cdata )
      }
      feed.items.push(entry)
    })
    dispatch(getFeed(feed))
    return feed
  }

  return(
    <ul>
      {subs.map((sub, i) => 
        <li key={i}><button onClick={() => {displayFeed(sub)}}>{sub.name}</button></li>
      )}
    </ul>
  )
}

export default SubsPanel
