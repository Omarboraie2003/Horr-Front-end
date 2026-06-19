import { useEffect, useRef, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';

const HUB_URL = 'https://localhost:7070/hubs/chat';

// ---------------------------------------------------------------------------
// useChatConnection
//
// Establishes a SignalR connection to the chat hub for the given chatId.
// - Reads auth token from localStorage under the key 'token'.
// - Invokes 'JoinChat' with chatId on successful connection.
// - Invokes 'LeaveChat' and stops the connection on unmount.
// - Uses .withAutomaticReconnect() for resilience.
//
// @param {string|null} chatId   — The chat room to join. Connection is skipped
//                                  when null/undefined.
// @param {Function}    onMessage — Callback invoked with each incoming message
//                                  object from the 'ReceiveMessage' hub event.
// ---------------------------------------------------------------------------
export function useChatConnection(chatId, onMessage) {
  const connectionRef = useRef(null);
  // Keep the onMessage callback in a ref so we never need to re-run the
  // effect when only the callback identity changes.
  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // Stable helper that stops the connection gracefully.
  const stopConnection = useCallback(async () => {
    const conn = connectionRef.current;
    if (!conn) return;
    try {
      if (conn.state === signalR.HubConnectionState.Connected) {
        await conn.invoke('LeaveChat', chatId);
      }
      await conn.stop();
    } catch (err) {
      console.warn('[useChatConnection] error during stop:', err);
    } finally {
      connectionRef.current = null;
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;

    const token = localStorage.getItem('token');

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    connectionRef.current = connection;

    // Register incoming message handler before starting.
    connection.on('ReceiveMessage', (message) => {
      onMessageRef.current?.(message);
    });

    // Start and join the room.
    connection
      .start()
      .then(async () => {
        try {
          await connection.invoke('JoinChat', chatId);
        } catch (err) {
          console.error('[useChatConnection] JoinChat error:', err);
        }
      })
      .catch((err) => {
        console.error('[useChatConnection] connection start error:', err);
      });

    // Cleanup: leave room and stop on unmount or chatId change.
    return () => {
      stopConnection();
    };
  }, [chatId, stopConnection]);

  return connectionRef;
}

export default useChatConnection;
