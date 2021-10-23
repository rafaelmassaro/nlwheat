import React, { useState } from 'react';
import { View, TextInput, Alert, Keyboard } from 'react-native'

import { styles } from './styles';

import { Button } from '../Button';
import { COLORS } from '../../theme';
import { api } from '../../services/api';

export function SendMessage(){
    const [ message, setMessage ] = useState('')
    const [ sendingMessage, setSendingMessage ] = useState(false)

    async function handleMessageSubmit() {
        const messageFormated = message.trim();

        if(messageFormated.length > 0){
            setSendingMessage(true)
            await api.post('/messages', { message: messageFormated })

            setMessage('')
            Keyboard.dismiss()
            setSendingMessage(false)
            Alert.alert('Mensagem enviada com sucesso!')
        }else{
            Alert.alert('Escreva a mensagem para poder enviar.')
        }
    }

    return(
        <View style={styles.container}>
            <TextInput
                keyboardAppearance='dark'
                placeholder="Qual a sua expectativa para o evento?"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                multiline
                maxLength={140}
                onChangeText={setMessage}
                value={message}
                style={styles.input}
                editable={!sendingMessage}
            />

            <Button 
                title="ENVIAR MENSAGEM" 
                color={COLORS.WHITE} 
                backgroundColor={COLORS.PINK} 
                isLoading={sendingMessage}
                onPress={handleMessageSubmit}
            />
        </View>
    )
}