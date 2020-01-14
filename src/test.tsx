import * as React from 'react'
import { Button } from 'antd';

interface IProps {
  color: string,
  size?: string,
}
interface IState {
  count: number,
}
class App extends React.Component<IProps, IState> {
  public state = {
    count: 1,
  }
  public render () {
    return (
      <div><Button type='danger'>点击</Button></div>
    )
  }
}

export default App;