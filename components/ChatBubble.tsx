import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getCharacterImage } from '../utils/assistantUtils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  fileUri?: string;
  fileType?: 'image' | 'document';
}

interface ChatBubbleProps {
  message: Message;
  avatar?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, avatar }) => {
  const safeAvatar = avatar ? avatar.toLowerCase() : 'fatima';
  
  return (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessageContainer : styles.assistantMessageContainer
    ]}>
      {!message.isUser && (
        <View style={styles.characterAvatar}>
          <Image
            source={getCharacterImage(safeAvatar)}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.assistantBubble
      ]}>
        {message.fileUri && (
          <View style={styles.attachmentContainer}>
            {message.fileType === 'image' ? (
              <Image
                source={{ uri: message.fileUri }}
                style={styles.attachedImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.attachedDocument}>
                <MaterialIcons name="insert-drive-file" size={24} color="#666" />
                <Text style={styles.documentText}>Document</Text>
              </View>
            )}
          </View>
        )}
        
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userMessageText : styles.assistantMessageText
        ]}>
          {message.text}
        </Text>
      </View>

      {message.isUser && (
        <View style={styles.userAvatar}>
          <MaterialIcons name="person" size={20} color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  assistantMessageContainer: {
    justifyContent: 'flex-start',
  },
  characterAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  assistantMessageText: {
    color: '#333',
  },
  attachmentContainer: {
    marginBottom: 8,
  },
  attachedImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  attachedDocument: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  documentText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#374151',
  },
});

export default ChatBubble;
