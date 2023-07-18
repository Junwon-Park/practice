import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: '/',
  transports: ['websocket'],
  pubsub: {
    host: 'localhost',
    port: 63709,
  },
})
export class ConnectionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;

  //   constructor() {}

  // Note: Implement OnGatewayConnection
  async handleConnection(@ConnectedSocket() client: any): Promise<void> {
    this.server.to(client.id).emit('connected');

    console.log(
      new Date(),
      'ConnectionGateway: handleConnection',
      client.data,
      client.id,
    );
  }

  // Note: Implement OnGatewayDisconnect
  async handleDisconnect(@ConnectedSocket() client: any): Promise<void> {
    console.log(new Date(), 'ConnectionGateway: handleDisconnect', client.data);

    const signature = client.data.signature;
    if (signature == null) {
      return;
    }

    client.leave(signature.id);

    // this.eventEmitter.emit('utm-utms/client-disconnected', client.id);
  }
}
