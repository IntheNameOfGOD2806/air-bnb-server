import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";

@WebSocketGateway(3005, { cors: { origin: "*" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;
  private logger: Logger = new Logger("ChatGateway");
  afterInit(server: Server) {
    this.logger.log("WebSocket initialized");
  }
  handleConnection(client: Socket) {
    const query = client.handshake.query;
    this.logger.log(
      `Client connected: ${client.id}, Query: ${JSON.stringify(query)}`
    );
    // Example: get token from query
    const token = query.token;
    this.logger.log(`Client connected: ${client.id}`);

    client.broadcast.emit("user-joined", {
      message: `User joined the chat: ${client.id}`,
      clientId: client.id,
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    this.server.emit("user-left", {
      message: `User left the chat: ${client.id}`,
      clientId: client.id,
    });
  }

  @SubscribeMessage("newMessage")
  handleNewMessage(@MessageBody() message: any): void {
    console.log("New message:", message);
    this.server.emit("message", message);
  }
}
