import { StyleSheet, BackHandler, View } from 'react-native'

import { useState, useEffect } from 'react'
import Login from './views/login'
import Home from './views/home'
import Register from './views/register'
import { StatusBar } from 'expo-status-bar'
import Spinner from 'react-native-loading-spinner-overlay'
import Massage from './components/massage'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const [views, setViews] = useState({ login: 'true', home: '', register: '' })
  const [spinner, setSpinner] = useState(false)
  const [massage, setMassage] = useState('')

  const backActionHandler = (e) => {
    if (views.login) {
      BackHandler.exitApp()
    }
    if (views.register) {
      setViews((e) => ({ ...e, login: true, home: false }))
    }
    if (views.home) {
      setViews((e) => ({ ...e, login: true, home: false }))
    }
    return true
  }
  useEffect(() => {
    setTimeout(() => setMassage(''), 3000)
  }, [massage])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backActionHandler)
    return () => BackHandler.removeEventListener('hardwareBackPress', backActionHandler)
  }, [views])

  useEffect(() => {
    const url = 'https://biuro.adibau.pl/birthday/list'
    // const url = 'http://192.168.1.123:8080/birthday/list'

    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          setViews((e) => ({ ...e, login: false, home: true }))
        } else {
          setViews({ login: true })
        }
      })
      .catch((err) => console.log('error z get lisat', err))
  }, [])

  return (
    <>
      <View style={styles.container}>
        <StatusBar style='auto' backgroundColor={styles.container.backgroundColor} />
        {views.login && <Login view={views} setViews={setViews} setMassage={setMassage} />}
        {views.register && <Register view={views} setViews={setViews} />}
        {views.home && <Home setMassage={setMassage} setViews={setViews} />}
        <Spinner visible={spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
        {massage && <Massage msg={massage} />}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    backgroundColor: 'rgb(142, 184, 229)',
    height: '100%',
    width: '100%',
  },
  singleName: {
    width: '50%',
    textAlign: 'left',
  },
  singleDate: {
    width: '25%',
    textAlign: 'left',
  },
  singleLeft: {
    width: '25%',
    textAlign: 'right',
  },
  viewItem: {
    width: '98%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    marginHorizontal: 3,
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#7C99B4',
  },
  line: {
    width: '100%',
    borderColor: '#ddd',
    borderBottomWidth: 2,
    height: 5,
  },
  textItem: { fontWeight: 'bold' },

  text: { fontSize: 11 },
})
