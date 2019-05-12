import { Component, Inject } from '@angular/core';
// import { LINK_PROVIDERS, LinkProvider } from './link-provider';
import { socket, Socket } from 'zeromq';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZeroMQ Subscriber';

  socket: Socket;

  constructor(/* @Inject(LINK_PROVIDERS) public linkProviders: LinkProvider[] */) {

    this.socket = socket('sub');
    this.socket.connect('tcp://127.0.0.1:3000');
    this.socket.subscribe('Greetings');
    console.log('Socket connected to port 3000, subscribed to topic "Greetings"');
    this.socket.on('message', (topic: string, message: string) => {
      console.log('Message received: "' + message + '"');
    });
  }
}
