import { Text } from 'react-native';

import InputBar from "./InputBar"

export default function({scrollToBottom, sendMessage, setInputBarText, inputBarText}){
    return(
        <>
        <Text>Stuff here</Text>
                <InputBar 
                  onSendPressed={sendMessage} 
                  onSizeChange={() => scrollToBottom(false)}
                  onChangeText={setInputBarText}
                  text={inputBarText}
                />
        <Text>Other stuff here</Text>
        </>
    )
}