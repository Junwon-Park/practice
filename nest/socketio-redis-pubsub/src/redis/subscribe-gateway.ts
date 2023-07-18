import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Optional, Map } from 'src/types/natives';
import { PubSubRedisRepository } from './pubsub.repository';

export type Subscriber = {
  clientId: string;
  callSigns?: string[];
};

@WebSocketGateway({
  namespace: '/',
  transports: ['websocket'],
  pubsub: {
    host: 'localhost',
    port: 63709,
  },
})
export class SubscribeGateway {
  public static readonly key = 'TestSubscribers';

  constructor(private readonly redisRepository: PubSubRedisRepository) {
    // Do nothing
  }

  @SubscribeMessage('subscribeTest')
  async handleSubscribe(@ConnectedSocket() client: any): Promise<void> {
    console.log(new Date(), 'SubscribeGateway: handleSubscribe', client.id);

    let subscribers: Optional<Map<Subscriber>> = await this.redisRepository.get(
      SubscribeGateway.key,
    );
    if (subscribers == null) {
      subscribers = {};
    }

    subscribers[client.id] = { clientId: client.id };
    await this.redisRepository.set(SubscribeGateway.key, subscribers);
  }

  @SubscribeMessage('unsubscribeTest')
  async handleUnsubscribeMonitoring(
    @ConnectedSocket() client: any,
    @MessageBody() body: any,
  ): Promise<void> {
    console.log(new Date(), 'SubscribeGateway: handleUnsubscribe', body);

    await this.removeSubscriber(client.id);
  }

  private async removeSubscriber(clientId: string): Promise<void> {
    console.log('remove ' + clientId);
    let subscribers: Optional<Map<Subscriber>> = await this.redisRepository.get(
      SubscribeGateway.key,
    );
    if (subscribers == null) {
      subscribers = {};
    }

    delete subscribers[clientId];
    await this.redisRepository.set(SubscribeGateway.key, subscribers);
  }
}
