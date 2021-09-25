import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Birds from './components/Birds'
import Obstacles from './components/Obstacles'

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdsLeft = screenWidth / 2
  const [birdsBottom, setBirdsBottom ] = useState(screenHeight/2)
  const [obstaclesLeft, sertObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, sertObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  const gravity = 3
  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo
  const [isGameOver, setIsGameOver] = useState(false)

  //start bird falling
  useEffect(() => {
    if (birdsBottom > 0){
      gameTimerId = setInterval(() => {
        setBirdsBottom(birdsBottom => birdsBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdsBottom])
  console.log(birdsBottom)

  const jump = () => {
    if(!isGameOver && (birdsBottom < screenHeight)){
      setBirdsBottom(birdsBottom => birdsBottom + 50)
      console.log('jumped')
    }
  }
  
  //start build first obstacles
  useEffect (() => {
    if(obstaclesLeft > -obstacleWidth){
      obstaclesLeftTimerId = setInterval(() => {
        sertObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      },30)
      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    }else{
      sertObstaclesLeft(screenWidth)
      setObstaclesNegHeight(- Math.random() * 100)
    }
  }, [obstaclesLeft])

    //start second obstacles
    useEffect (() => {
      if(obstaclesLeftTwo > -obstacleWidth){
        obstaclesLeftTimerIdTwo = setInterval(() => {
          sertObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
        },30)
        return () => {
          clearInterval(obstaclesLeftTimerIdTwo)
        }
      }else{
        sertObstaclesLeftTwo(screenWidth)
        setObstaclesNegHeightTwo( - Math.random() * 100)
      }
    }, [obstaclesLeftTwo])

  //check for collisions
  useEffect(() => {
    if( 
    ((birdsBottom < (obstaclesNegHeight + obstacleHeight + 30) ) ||
    birdsBottom > (obstaclesNegHeight + obstacleHeight +gap -30) &&
    (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 +30)
    )
    ||
    ((birdsBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ) ||
    birdsBottom > (obstaclesNegHeightTwo + obstacleHeight +gap -30)) &&
    (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 +30)
    )
    {
      console.log('game over')
      gameOver()
      
    }
  })
  
  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    setIsGameOver(true)
  }



  return (
    <TouchableWithoutFeedback onPress={jump}>
          <View style={styles.container}>
      <Birds 
        birdsBottom={birdsBottom}
        birdsLeft={birdsLeft}
      />
      <Obstacles
        color={'green'}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomBottom={obstaclesNegHeight}
        gap={gap}
        obstaclesLeft={obstaclesLeft}
    
      />
      <Obstacles
        color={'yellow'}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomBottom={obstaclesNegHeightTwo}
        gap={gap}
        obstaclesLeft={obstaclesLeftTwo}
    
      />
    </View>
    </TouchableWithoutFeedback>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
