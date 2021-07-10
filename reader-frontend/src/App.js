import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser, logout } from './reducers/loginReducer'
import subsService from './services/subs'
import LoginForm from './components/LoginForm'
import SideBar from './components/SideBar'
import ContentPanel from './components/ContentPanel'
import './App.css'

const App = () => {
  // STATES
  const [ currentSub, setCurrentSub ] = useState('')
  const [ feeds, setFeeds ] = useState([])

  const dispatch = useDispatch()

  const user = useSelector(state => state)

  // on page load
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const loggedInUserJSON = JSON.parse(loggedInUser)
      dispatch(setLoggedInUser(loggedInUserJSON)) 
    }
    document.body.style.backgroundColor = 'antiquewhite'
  }, [dispatch])

  // get rss data and create new feed object
  const getFeed = async sub => {
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
    console.log(currentSub)
  }

  if (!user) {
    return(
      <LoginForm />
    )
  }

  return (
    <div>
      Logged in as {user.name} 
      <button onClick={() => dispatch(logout())}>logout</button>
      <div className='main'>
        <SideBar displayFeed={displayFeed} />
        <ContentPanel currentSub={currentSub} />
      </div>
    </div>
    )
}

export default App;
