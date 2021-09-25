import React from 'react'
import { View } from 'react-native'


const Birds = ({birdsBottom, birdsLeft}) => {
    const birdsWidth = 50
    const birdsHeight = 60

    return(
        <View style={{ 
            position: 'absolute',
            backgroundColor: 'blue',
            width: birdsWidth,
            height: birdsHeight,
            bottom: birdsBottom,
            left: birdsLeft - (birdsWidth/2),
            bottom: birdsBottom,
        }}/>
    )
}

export default Birds