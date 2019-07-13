import { Component, h, Prop, Host, State } from '@stencil/core';
import { httpWrapper } from '../../utils/httpWrapper';

@Component({
  tag: 'gm-user-detail',
  styleUrl: 'my-component.scss',
  shadow: true
})
export class UserDetail {
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
        <img src={this.data.avatar_url} />
        <h1>{this.data.name}</h1>
        <h2>{this.data.bio}</h2>
        <h2>{this.data.company} - {this.data.location}</h2>
      </Host>
    );
  }
}
