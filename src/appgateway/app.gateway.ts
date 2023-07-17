import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Simplest websocket for DEMO
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private logger: Logger) {}

  afterInit(server: Server) {
    this.logger.debug({ server }, 'AppGateway => afterInit Initialized');
  }

  async handleConnection(client: Socket) {
    this.logger.log(
      {
        id: client.id,
      },
      'AppGateway => client connected.',
    );
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(
      {
        id: client.id,
      },
      'AppGateway => client disconnected.',
    );
  }

  @SubscribeMessage('shared-video')
  handleSharedVideoEvent(@MessageBody() sharedUrl: string) {
    this.logger.debug({ sharedUrl }, 'AppGateway => A new URL shared');
    this.logger.debug('Broadcasting shared URL to all clients');

    this.server.sockets.emit('shared-video', sharedUrl);
  }
}
