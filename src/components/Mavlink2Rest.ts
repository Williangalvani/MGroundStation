interface Dictionary<T> {
    [key: string]: T;
  }

class Mavlink2RestManager {
  baseUrl: string;
  // Dictionary mapping endpoint name to array of callbacks
  listeners: Dictionary<Array<(msg: string) => void>> = {}
  // Dictionary mapping endpoints to websocket
  sockets: Dictionary<WebSocket> = {}

  constructor() {
      this.baseUrl = `${this.getWebsocketPrefix()}://${window.location.host}/ws/mavlink`
      this.listeners = {}
  }

  setBaseUrl(url: string) {
      // close all websockets and discard them
      for (const [endpoint, socket] of Object.entries(this.sockets)) {
          socket.close()
          delete this.sockets[endpoint]
      }
      if(!this.isValidEndpoint(url)) {
          return
      }
      this.baseUrl = url
      // Re-start all 

      // this block gathers all callbacks and endpoints to reconnect then later
      let endpointList: any = []
      for (const [endpoint, callbacks] of Object.entries(this.listeners)) {
          for (const callback of callbacks) {
              endpointList.push([endpoint, callback])
          }
      }

      // reconnects all callbacks
      for (const [endpoint, callback] of endpointList) {
          this.startListening(endpoint, 1, callback)
      }
  }
  startListening (endpoint: string, frequency: number, callback: (msg: string) => void): void {
      if (!this.isValidEndpoint(endpoint)) {
          return
      }
      this.setupFrequency(frequency)
      
      let socket = this.sockets[endpoint] || this.createWebsocket(endpoint)
       
      this.sockets[endpoint] = socket
      if (!(endpoint in this.listeners)) {
          this.listeners[endpoint] = []
      }
      this.listeners[endpoint].push(callback)
      socket.onmessage = (message) => {
          for (let callback of this.listeners[endpoint]) {
              callback(message.data)
          }
      }
  }

  isValidEndpoint (endpoint: string): boolean {
      // TODO: validate this
      return true
  }

  setupFrequency(frequency: number): void{
      // TODO: implement this
      return
  }

  createWebsocket (endpoint: string): WebSocket { 
      return new WebSocket(this.baseUrl+endpoint)
  }

  getWebsocketPrefix() {
      return window.location.protocol == "https:" ? "wss" : "ws"
  }
 
}

let mavlink2rest = new Mavlink2RestManager()

export default mavlink2rest