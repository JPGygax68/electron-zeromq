import { Component, Inject } from '@angular/core';
// import { LINK_PROVIDERS, LinkProvider } from './link-provider';
import { socket, Socket } from 'zeromq';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZeroMQ Publisher';

  socket: Socket;

  constructor(/* @Inject(LINK_PROVIDERS) public linkProviders: LinkProvider[] */) {

    this.socket = socket('pub');
    this.socket.bind('tcp://127.0.0.1:3000', error => {
      if (error) {
        throw new Error(error);
      }
      console.log('Publisher bound to port 3000');
      console.log('Starting to send numbered multipart messages...');
      let i = 0;
      setInterval(() => {
        this.socket.send(['Greetings', `Hello #${++i}!`]);
        console.log('message sent');
      }, 500);
    });
  }
}
