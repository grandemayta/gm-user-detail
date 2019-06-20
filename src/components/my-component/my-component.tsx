import { Component, h, Prop, Host, State } from '@stencil/core';
import { httpWrapper } from '../../utils/httpWrapper';

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

  async componentWillRender() {
    this.data = await httpWrapper(this.nickname);
  }

  render() {
    return (
      <Host>
        <h1>{this.data.name}</h1>
        <h2>{this.data.bio}</h2>
        <p>{this.data.company}</p>
      </Host>
    );
  }
}
