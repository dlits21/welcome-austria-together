import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getCharacterImage } from '../utils/assistantUtils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  fileUri?: string;
  fileType?: 'image' | 'document';
  attachments?: Array<{
    uri: string;
    type: 'image' | 'document';
  }>;
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
        {/* Handle multiple attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {message.attachments.map((attachment, index) => (
                <View key={index} style={styles.attachmentItem}>
                  {attachment.type === 'image' ? (
                    <Image
                      source={{ uri: attachment.uri }}
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
              ))}
            </ScrollView>
          </View>
        )}

        {/* Handle legacy single file attachment */}
        {message.fileUri && !message.attachments && (
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
  attachmentsContainer: {
    marginBottom: 8,
  },
  attachmentItem: {
    marginRight: 8,
  },
  attachedImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  attachedDocument: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    width: 120,
  },
  documentText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#374151',
  },
});

export default ChatBubble;
