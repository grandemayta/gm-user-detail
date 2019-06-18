import { Component, h, Prop, Host, Watch, State } from '@stencil/core';

@Component({
  tag: 'gm-user-detail',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The nickname
   */
  @Prop() nickname: string;
  @State() data: any;

  getGraphQLRequest() {
    return JSON.stringify({ 
      query: `{ user(login: "${this.nickname}") { login name company bio } }`
    });
  }

  async httpWrapper() {
    const response = await fetch('https://nestjs-graphql.herokuapp.com/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: this.getGraphQLRequest()
    });
    const json = await response.json();
    return  json.data.user;
  }

  @Watch('nickname')
  async watchHandler() {
    console.log('watchHandler');
    this.data = await this.httpWrapper();
  }

  async connectedCallback() {
    this.data = await this.httpWrapper();
  }

  loadingTpl() {
    return (
      <Host>
        <h1>Loading...</h1>
      </Host>
    );
  }

  render() {
    console.log('render called',this.nickname, this.data);
    if (!this.data) return this.loadingTpl()
    return (
      <Host>
        <h1>{this.data.name}</h1>
        <h2>{this.data.bio}</h2>
        <p>{this.data.company}</p>
      </Host>
    );
  }
}
